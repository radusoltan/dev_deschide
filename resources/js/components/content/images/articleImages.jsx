import {Button, Card, Col, Divider, Image, Radio, Space, Spin} from "antd";
import {
  useDetachImageFromArticleMutation,
  useGetImagesByArticleQuery,
  useSetArticleMainImageMutation
} from "../../../services/images";
import {DeleteFilled, ScanOutlined, UploadOutlined} from "@ant-design/icons";
import {ImageUploader} from "./uploader";
import {useState} from "react";
import {Cropper} from "./cropper";

export const ArticleImages = ({article}) => {
	const {data, isLoading} = useGetImagesByArticleQuery(article)
  const [isCrop, setIsCrop] = useState(true)
	const [upload, setUpload] = useState(false)
  const [detachImage] = useDetachImageFromArticleMutation()
  const [setMain] = useSetArticleMainImageMutation()

	if (isLoading) return <Spin />



  const images = data?.map(({id, name, pivot})=><Col key={id} >
    <Card cover={<Image src={process.env.MIX_APP_URL+'/storage/images/'+name} preview={false} />}>
      <Divider orientation="right" />
      <Radio onClick={()=>{
        setMain({id:article, image: id})
      }} checked={pivot.is_main}>Set Main</Radio>
      <Space>
        <Button
          icon={<DeleteFilled />}
          danger
          type="primary"
          onClick={()=>{
            detachImage({id:article, image: id})
          }}
        />
        {pivot.is_main &&
          <Button
            icon={<ScanOutlined />}
            type="info"
            onClick={()=>{
              setIsCrop(true)
            }}
        />}
      </Space>
    </Card>
  </Col>)

	return <Card
		loading={isLoading}
		extra={<Button
			type="primary"
			icon={<UploadOutlined />}
			onClick={() => setUpload(true)}

		>Upload</Button>}
	>
    {images}
		<ImageUploader
			open={upload} onCancel={()=>setUpload(false)}
			onOk={()=> setUpload(false)}
			id={article}
		/>
    {images.length !== 0 &&
      <Cropper
        open={isCrop} i
        image={data?.find(({pivot})=>pivot.is_main===1)}
        onCancel={()=>setIsCrop(false)}
        onOk={()=> setIsCrop(false)}
      />}

	</Card>
}
