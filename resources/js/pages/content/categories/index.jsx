import {
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
	useUpdateCategoryMutation
} from "../../../services/categories";
import {useEffect, useState} from "react";
import {Button, Card, Pagination, Spin, Switch, Table, notification} from "antd";
import {EditCategory, NewCategory} from "../../../components/content/categories/_form";
import i18n from "../../../i18n";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const Categories = () => {
  const [page,setPage] = useState(1)
  const [ isNew, setIsNew ] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [isTranslate,setIsTranslate] = useState(false)
  const [category,setCategory] = useState(null)
  const {t} = useTranslation()
  const {data: paginatedCategories, isLoading} = useGetCategoriesQuery(page)
  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()


  const edit = id => {
    const category = paginatedCategories?.data.find(category=> id === category.id)
    console.log('edit',category)
    setIsEdit(true)
    setCategory(category)
    // notification.success({
    //   message: t('pages.content.categories.messages.updated')
    // })
    // setIsEdit(false)
    // setCategory(null)
  }


  const publish = key => {

	  const category = paginatedCategories?.data.find(({id})=> id === key)
      .translations.find(({locale})=>locale === i18n.language)

    const body = {
      locale: i18n.language,
      in_menu: !category.in_menu,
      title: category.title
    }

    updateCategory({id: category.category_id,body})

  }


  if (isLoading) <Spin />

  const columns = [
    {
      title: t("pages.content.categories.table.title"),
      dataIndex: 'title',
      key: 'title',
      render: (text,{key}) => (
        <Link to={`/content/category/${key}`}>{text}</Link>
      )
    },
    {
      title: t('pages.content.categories.table.in_menu'),
      dataIndex: 'in_menu',
      key: 'in_menu',
      render: (text,{key,in_menu}) => (
        <Switch onChange={()=>{
          publish(key)
        }} checked={in_menu} />
      )
    },
    {
      title: '',
      render: ({ key }) => (
        <><Button
          type="primary"
          className='table-buttons'
          icon={<DeleteOutlined />}
          onClick={() => deleteCategory(key)}
          danger
        />
        <Button
          type="warning"
          className='table-buttons'
          icon={<EditOutlined />}
          onClick={() => edit(key)} />
        </>
      ),
    }
  ]

  const categories = paginatedCategories?.data.map(({id,in_menu,translations})=>{
    const translation = translations.find(({ locale }) => locale === i18n.language)
    return translation ? ({
      key: id,
      title: translation.title,
      in_menu
    }) : ({
      key: id,
      title: 'No title',
      in_menu
    })
  })

  return <Card
    extra={
      <Button type="success" onClick={()=>{
        setIsNew(true)
      }}>Add</Button>
    }
    loading={isLoading}
  >
    <Table columns={columns} dataSource={categories} pagination={false}/>
    <Pagination
      total={paginatedCategories?.total}
      defaultCurrent={paginatedCategories?.current_page}
      onChange={(page) => setPage(page)}
    />
    <NewCategory
      visible={isNew}
      onCancel={()=>setIsNew(false)}
      onCreate={(values)=>{
        setIsEdit(false)
        addCategory(values)
        notification.success({
          message: t('pages.content.categories.messages.added')
        })
      }}
    />
    <EditCategory
      visible={isEdit}
      onCancel={() => setIsEdit(false)}
      onUpdate={(values) => {
        setIsEdit(false)
        setCategory(null)
        updateCategory({id: category.id,body: values})
        notification.success({
          message: t('pages.content.categories.messages.updated')
        })
      }}
      category={category}
    />
  </Card>
}
