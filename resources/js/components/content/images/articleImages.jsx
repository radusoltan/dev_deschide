import {Button, Card, Spin} from "antd";
import {useGetImagesByArticleQuery} from "../../../services/images";
import {UploadOutlined} from "@ant-design/icons";
import {ImageUploader} from "./uploader";
import {useState} from "react";

export const ArticleImages = ({article}) => {
	const {data, isLoading} = useGetImagesByArticleQuery(article)
	const [upload, setUpload] = useState(false)
	if (isLoading) return <Spin />
	return <Card
		loading={isLoading}
		extra={<Button
			type="primary"
			icon={<UploadOutlined />}
			onClick={() => setUpload(true)}

		>Upload</Button>}
	>
		Article Images
		<ImageUploader
			open={upload} onCancel={()=>setUpload(false)}
			onOk={images=>{
				console.log(images)
			}}
			id={article}
		/>
	</Card>
}
