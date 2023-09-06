import {Card, Col, Image, Modal, Row, Space, Spin} from "antd";
import ReactCrop, {centerCrop, makeAspectCrop} from "react-image-crop";
import {useCropImageMutation, useGetRenditionsQuery, useGetThumbnailsQuery} from "../../../services/images";
import {useEffect, useRef, useState} from "react";
import {canvasPreview} from './canvasPreview'
import {useDebounceEffect} from './useDebounceEffect'

export const Cropper = ({open, image, onCancel, onOk}) => {
  const imageRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [aspect, setAspect] = useState()
  const [crop, setCrop] = useState()
  const [selectedRendition, setSelectedRendition] = useState()
  const [thumbnails, setThumbnails] = useState([])
  const [completedCrop, setCompletedCrop] = useState()
  const {data: thumbnailsData, isLoading: thumbnailsLoading, isSuccess: thumbnailsSuccess} = useGetThumbnailsQuery(image.id)
  const {data: renditionsData, isLoading: renditionsLoading, isSuccess: renditionsSuccess} = useGetRenditionsQuery()
  const [cropImage] = useCropImageMutation()

  useEffect(() => {
    if (thumbnailsSuccess && renditionsSuccess) {
      setLoading(false)
      setThumbnails(thumbnailsData)
      setSelectedRendition(renditionsData[0].id)
      setAspect(renditionsData[0].aspect)
      setCrop(JSON.parse(thumbnailsData.find(({rendition_id})=>rendition_id=== renditionsData[0].id).coords))
    }
  }, [thumbnailsSuccess, renditionsSuccess])

  useDebounceEffect(async ()=>{
    if (
      crop.width &&
      crop.height &&
      imageRef.current &&
      previewCanvasRef.current
    ){
      canvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        crop,
        1
      )
    }
  }, 100, [crop])

  const rightCol = thumbnails.map(({id,rendition_id, path, coords})=>(<div key={id} className="thumbnail-container">
    <Card
      cover={
        completedCrop && selectedRendition === rendition_id ? <canvas ref={previewCanvasRef} /> :
        <Image src={process.env.MIX_APP_URL+'/'+path} preview={false}/>
      }
      hoverable
      bodyStyle={
        selectedRendition === rendition_id ? {
          background: '#f0f2f5',
          boxShadow: '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)'
        } : {}
      }
      onClick={()=>{
        setSelectedRendition(rendition_id)
        setAspect(renditionsData.find(({id})=>id === rendition_id).aspect)
        setCrop(JSON.parse(coords))
      }}
    >
    </Card>
  </div>))


  return <Modal
    open={open}
    width='70%'
    onOk={()=>{
      setCrop(null)
      setCompletedCrop(null)
      setAspect(null)
      setSelectedRendition(null)
      onOk()
    }}
    onCancel={()=>{
      setCrop(null)
      setCompletedCrop(null)
      setAspect(null)
      setSelectedRendition(null)
      onCancel()
    }}
  >
    <Card loading={loading}>
      <Row>
        <Col span={4}>{rightCol}</Col>
        <Col span={20}>
          <Card>
            <ReactCrop
              onChange={(crop, percent)=>{
                setCrop(percent)
              }}
              onComplete={(crop, percent)=>{
                setCrop(crop)
                setCompletedCrop(percent)
                cropImage({id: image.id, body: {
                  crop: {p: percent, c: crop},
                  rendition: selectedRendition
                }})
              }}
              crop={crop}
              aspect={aspect}
            >
              <img ref={imageRef} src={process.env.MIX_APP_URL+'/'+image.path} />
            </ReactCrop>
          </Card>
        </Col>
      </Row>
    </Card>
  </Modal>
}

const centerAspectRatio = (mediaWidth, mediaHeight, aspect)=>{
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}
