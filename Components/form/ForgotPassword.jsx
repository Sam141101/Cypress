// import AuthLayout from "Layouts/AuthLayout/AuthLayout";
import { useTranslations } from "next-intl";
import authServices from "../../utils/services/auth";
import { useRouter } from "next/router";
import Style from "../../Components/form/Login.module.scss"
import { EditOutlined } from '@ant-design/icons';

import { Button, Form, Input, Typography, notification } from "antd";



function ForgotPassword() {
    const t = useTranslations();
    const router = useRouter()

    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const onSubmitForm = async (values) => {
        let body;
        if (regex.test(values.userInfo)) {
            body = {
                username: "",
                email: values.userInfo
            }
        } else {
            body = {
                username: values.userInfo,
                email: ""
            }
        }

        const res = await authServices.sendMailResetPassword({ body });

        const { data } = res;

        if (data.error) {
            form.resetFields();
            api.warning({
                message: "Warning",
                description: "Opp! Some things went wrong, " + data.error,
            });
            return
        }

        api.info({
            message: "Account Info",
            description: data.message,
        });
        form.resetFields();
        router.push("/login");
    };

    const handleOk = () => {
        // setForgotPasswordModal(false);
        form
            .validateFields()
            .then((values) => {
                onSubmitForm(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };


    return (
        <>
            {contextHolder}
            <div className={Style.Login}>
                <Form
                    onFinish={handleOk}
                    className={
                        Style.Login_form
                    }
                    form={form}
                    name="form_in_modal"
                >
                    <>
                        <div className={Style.Login_form_title}>{t("forgot_password.title")}</div>
                        <div className={Style.Login_form_description}>
                            {t("forgot_password.description")}
                        </div>

                        <Typography.Title className={Style.Login_form_label_input}>
                            {t("signup.email")}
                        </Typography.Title>
                        <Form.Item
                            name="userInfo"
                            rules={[
                                {
                                    required: true,
                                    message: t("signup.required_email"),
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={<EditOutlined />}
                                placeholder={t("signup.placeholder_email")}
                                style={{ width: "100%" }}
                            // type="email"
                            />
                        </Form.Item>

                        <div className={Style.Login_form_item}>
                            <Button
                                htmlType="submit"
                                className={Style.Login_form_submit}
                            >
                                <span>{t("forgot_password.submit")}</span>
                            </Button>
                        </div>
                    </>
                </Form>
            </div>
        </>
    );
}

export default ForgotPassword;

// ForgotPassword.getLayout = function getLayout(page) {
//     return <AuthLayout destination="/login">{page}</AuthLayout>;
// };
