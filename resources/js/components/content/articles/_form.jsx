import {Card, Form, Input, Modal, Select} from "antd";
import i18n from "../../../i18n";

export const NewArticle = ({visible, onCancel, onOk}) => {
	const [form] = Form.useForm()

	return <Modal
		open={visible}
		onCancel={()=> {
			form.resetFields()
			onCancel()
		}}
		onOk={()=> {
			form.validateFields().then(values=>{
				onOk(values)
			})
		}}
	>
		<Card>
			<Form
				form={form}
				initialValues={{
					locale: i18n.language
				}}
			>
				<Form.Item name="title" label="Title" rules={[
					{ required: true, message: 'Please input article title!' },
				]}>
					<Input />
				</Form.Item>
				<Form.Item name="locale" label="Select article language">
					<Select>{
						i18n.languages.map((locale)=>(<Select.Option key={locale} value={locale}>{locale}</Select.Option>))
					}</Select>
				</Form.Item>

			</Form>
		</Card>

	</Modal>
}
