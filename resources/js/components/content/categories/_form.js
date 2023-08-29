import {Divider, Form, Input, Modal, Select, Spin, Switch} from "antd";
import i18n from "../../../i18n";
import {useGetCategoryQuery} from "../../../services/categories";

export const NewCategory = ({visible, onCancel, onCreate}) => {
    const [form] = Form.useForm()
    return <Modal
        open={visible}
        onCancel={onCancel}
        onOk={()=>{
            form.validateFields()
                .then(values => {
                    form.resetFields()
                    onCreate(values)
                })
        }}
    >
        <Form
            form={form}
            layout="vertical"
            name="new_category"
            initialValues={{in_menu: false}}
        >
            <Form.Item
                label={"Title"}
                name="title"
                rules={[{required: true, message: "Please input the title of category!"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label="In Menu" name="in_menu" valuePropName="checked">
                <Switch defaultChecked={false} />
            </Form.Item>
        </Form>
    </Modal>
}

export const EditCategory = ({visible, onCancel, onUpdate, category}) => {

    const {title, in_menu} = category?.translations.find(({locale})=>locale===i18n.language) ?? {title: '', in_menu: false}

    const [form] = Form.useForm()
    return <Modal
        open={visible}
        onCancel={onCancel}
        onOk={()=>{
            form.validateFields()
                .then(values => {
                    form.resetFields()
                    onUpdate(values)
                })
        }}
    >
        <Form
            form={form}
            layout="vertical"
            name="edit_category"
            initialValues={{
                title,
                in_menu,
                locale: i18n.language
            }}
        >
            <Form.Item
                label={"Title"}
                name="title"
                rules={[{required: true, message: "Please input the title of category!"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label="In Menu" name="in_menu" valuePropName="checked">
                <Switch defaultChecked={false} />
            </Form.Item>
            <Divider/>
            <Form.Item label="Language" name="locale" rules={[
                {required: true, message: "Please select the language of category!"}
            ]}>
                <Select>
                    {
                        i18n.languages.map((lang, index) => (<Select.Option key={index} value={lang}>{lang}</Select.Option>))
                    }
                </Select>
            </Form.Item>
        </Form>
    </Modal>
}
