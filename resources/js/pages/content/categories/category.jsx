import {Button, Card, Form, Input, Modal, Pagination, Select, Spin, Table} from "antd";
import {useGetCategoryArticlesQuery, useGetCategoryQuery} from "../../../services/categories";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import i18n from "../../../i18n";
import {NewArticle} from "../../../components/content/articles/_form";
import {useAddArticleMutation} from "../../../services/articles";

export const Category = () => {
	const [form] = Form.useForm()
	const {id} = useParams()
	const [page, setPage] = useState(1)
	const [isNew, setIsNew] = useState(false)
	const {data, isLoading} = useGetCategoryArticlesQuery({id, page})
	const [addArticle,{data: addData, isSuccess: addIsSuccess, isLoading: addIsLoading }] = useAddArticleMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (addIsSuccess) {
      console.log('addIsSuccess', addData)
      const {id} = addData
      setIsNew(false)
      navigate(`/content/article/${id}`)
    }
  }, [addIsSuccess]);

	const articles = data?.data.map(({id, status, translations, created_at})=>{

		const article = translations.find(({locale})=>locale === i18n.language)

		return article ? {
			key: id,
			status,
			title: article.title,
			created_at
		} : {
			key: id,
			status,
			title: 'No translation',
			created_at
		}
	})

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			render: (text, {key}) => (<Link to={`/content/article/${key}`}>{text}</Link>)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (text) => (text)
		},
		{
			title: 'Created at',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => (text)
		}
	]

	return <Card
		loading={isLoading}
		extra={<Button type="success" onClick={()=>{
			setIsNew(true)
		}}>Add</Button>}
	>
		<Table
			pagination={false}
			dataSource={articles}
			columns={columns}
		/>
		<Pagination
			total={data?.total}
			defaultCurrent={data?.current_page}
			onChange={page=>setPage(page)}
		/>
		<NewArticle
			visible={isNew}
			onOk={(values)=>addArticle({category: id, values})}
			onCancel={()=>setIsNew(false)}
		/>
	</Card>
}
