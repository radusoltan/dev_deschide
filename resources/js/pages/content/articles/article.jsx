import {Button, Card, Spin, Space, Input, Row, Col, Select, Divider, Switch, notification} from "antd";
import {useGetArticleQuery, useUpdateArticleMutation} from "../../../services/articles";
import {useNavigate, useParams} from "react-router-dom";
import {BodyEditor} from "../../../components/content/articles/editor";
import {useEffect, useState} from "react";
import i18n from "../../../i18n";

export const Article = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data, isLoading, isSuccess} = useGetArticleQuery(id)
  const [updateArticle] = useUpdateArticleMutation()
  const [articleTitle, setArticleTitle] = useState('')
  const [articleLead, setArticleLead] = useState('')
  const [articleBody, setArticleBody] = useState('')
  const [articleIsAlert, setArticleIsAlert] = useState(false)
  const [articleIsFlash, setArticleIsFlash] = useState(false)
  const [articleIsBreaking, setArticleIsBreaking] = useState(false)
  const [articleStatus, setArticleStatus] = useState('')

  const [article, setArticle] = useState(null)

  const body = {
    title: articleTitle,
    lead: articleLead,
    body: articleBody,
    is_alert: articleIsAlert,
    is_flash: articleIsFlash,
    is_breaking: articleIsBreaking,
    status: articleStatus,
    locale: i18n.language
  }

  useEffect(() => {
    if (isSuccess){

      const {id, category_id, translations, is_alert, is_flash, is_breaking} = data
      const {title, lead, body, status, publish_at} = translations.find(({locale}) => locale === i18n.language)
      setArticleTitle(title)
      setArticleLead(lead)
      setArticleBody(body)
      setArticleIsAlert(is_alert)
      setArticleIsFlash(is_flash)
      setArticleIsBreaking(is_breaking)
      setArticleStatus(status)


    }
  }, [isSuccess]);

  const handleTitleChange = (e)=>{
    setArticleTitle(e.target.value)
  }

  const save = ()=>{
	  const arr = [
		  articleIsBreaking,
		  articleIsAlert,
		  articleIsFlash,
	  ]
	  // check if switcher is selected correctly
	  let checker = arr => arr.every(v => v === true);
	  if(checker(arr)){
		  console.log('all true')
		  notification.error({
			  message: 'Select only one (FLASH, ALERT or BREAKING)'
		  })
	  } else if (articleIsFlash && articleIsAlert){
		  console.log('check double')
		  notification.error({
			  message: 'Select only one (FLASH, ALERT or BREAKING)'
		  })
	  } else if (articleIsFlash && articleIsBreaking){
		  console.log('check double')
		  notification.error({
			  message: 'Select only one (FLASH, ALERT or BREAKING)'
		  })
	  } else if(articleIsAlert && articleIsBreaking){
		  console.log('check double')
		  notification.error({
			  message: 'Select only one (FLASH, ALERT or BREAKING)'
		  })
	  } else {
      updateArticle({id, body})
    }
  }

  const saveAndClose = ()=>{
    save()
    setTimeout(()=>{navigate(`/content/category/${data?.category_id}`)}, 2000)
    // navigate(`/content/category/${data?.category_id}`)
  }

  const close = ()=> navigate(`/content/category/${data?.category_id}`)

  if (isLoading) return <Spin />

  i18n.on('languageChanged', (lng) => {
    const {id, category_id, translations, is_alert, is_flash, is_breaking} = data
    const {title, lead, body, status, publish_at} = translations.find(({locale}) => locale === lng)
    setArticleTitle(title)
    setArticleLead(lead)
    setArticleBody(body)
    setArticleIsAlert(is_alert)
    setArticleIsFlash(is_flash)
    setArticleIsBreaking(is_breaking)
    setArticleStatus(status)
  })

  return <Card
    loading={isLoading}
    extra={<Space direction="horizontal">

      <Button onClick={save} type='success'>Save</Button>
      <Button type="info" onClick={saveAndClose}>Save & Close</Button>
      <Button type="primary" onClick={close} danger>Close</Button>
    </Space>}
  >
    <Input size="large" maxLength={200} showCount={true} value={articleTitle} onChange={handleTitleChange} />

    <Row>
      <Col span={18}>
        <Card>
          <BodyEditor
            initialValue={articleLead}
            onEdit={(val)=>{
              setArticleLead(val)
            }}
            field="lead"
          />
          <BodyEditor
            initialValue={articleBody}
            onEdit={(val)=>{
              setArticleBody(val)
            }}
            field="body"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Select value={articleStatus}>
            <Select.Option value="N">New</Select.Option>
            <Select.Option value="S">Submitted</Select.Option>
            <Select.Option value="P">Published</Select.Option>
          </Select>
          <Divider />
          <Card>
            <>
              <p>FLASH</p>
              <Switch
                onChange={(prop)=> setArticleIsFlash(prop)}
                onClick={(prop)=> setArticleIsFlash( prop)}
                checked={articleIsFlash}
              />
            </>
            <>
              <p>ALERT</p>
              <Switch
                onChange={(prop)=> setArticleIsAlert(prop)}
                checked={articleIsAlert}
                onClick={(prop)=> setArticleIsAlert(prop)}
              />
            </>
            <>
              <p>BREAKING</p>
              <Switch
                onChange={(prop)=> setArticleIsBreaking(prop)}
                checked={articleIsBreaking}
                onClick={(prop)=> setArticleIsBreaking(prop)}
              />
            </>
          </Card>
        </Card>
      </Col>
    </Row>

  </Card>
}
