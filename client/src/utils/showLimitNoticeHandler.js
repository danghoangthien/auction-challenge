import { Button, Modal, Row } from 'antd';
// import { getLocalUser } from 'utils/helper';
import styled from 'styled-components/macro';

import { RED_COLOR } from 'styles/StyleConstants';
import { sleep } from 'utils/helper';

const { error } = Modal;

// const LIMIT_PLANS = {
//   応援コメントへの返信: ['2'],
//   プロジェクトの限定公開: ['1', '2', '3'],
//   カスタム項目: ['2'],
// };

const LinkButton = ({ history }) => {
  return (
    <>
      <Button
        type="primary"
        size="large"
        style={{ fontWeight: 600 }}
        onClick={async () => {
          Modal.destroyAll();
          await sleep(1000);
          history.push('/app/contract');
        }}
      >
        契約内容へ
      </Button>
    </>
  );
};

const ModalContent = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  pointer-events: auto;

  .title-wrapper {
    padding: 16px 24px;
    box-shadow: inset 0px -1px 0px #f0f0f0;
    position: relative;

    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .emp {
    color: ${RED_COLOR};
    display: inline-block;
  }

  .content-wrapper {
    padding: 24px;
  }

  .close-btn {
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const showLimitNotice = ({ plan, name, history, form, formName }) => {
  console.log('plan', plan);
  console.log('name', name);
  console.log('form', form);
  console.log('formName', formName);

  // const user = getLocalUser();
  // console.log('user', user);
  // const contractPlan = user?.契約プラン情報?.raw?.契約プランタイプ;
  // console.log('contractPlan', contractPlan);

  // if (LIMIT_PLANS[name]?.includes(contractPlan)) {
  error({
    // title: `この機能は${plan}限定の機能です`,
    // content: (
    //   <>
    //     <Row className="mb-2">
    //       {name}は{plan}限定の機能です。
    //       <br />
    //       現在のプランではご利用いただけません。契約内容からプランアップをご検討ください。
    //     </Row>
    //     <Row justify="center">
    //       <LinkButton history={history} />
    //     </Row>
    //   </>
    // ),
    // wrapClassName: 'feature-notice-modal',
    // icon: false,
    closable: true,
    maskClosable: true,
    width: 480,
    // getContainer: test => {
    //   console.log(test);
    // },
    // modalRender: <>test</>,
    modalRender: () => {
      return (
        <ModalContent>
          <div className="title-wrapper">
            <div className="title">
              この機能は<span className="emp">{plan}</span>限定の機能です
            </div>
            <span
              className="material-symbols-outlined close-btn"
              onClick={() => {
                Modal.destroyAll();
                form && formName && form.resetFields([`${formName}`]);
              }}
            >
              close
            </span>
          </div>
          <div className="content-wrapper">
            <div className="mb-2">
              <strong>{name}</strong>は
              <strong>
                <span className="emp">{plan}</span>限定
              </strong>
              の機能です。
              <br />
              現在のプランではご利用いただけません。契約内容からプランアップをご検討ください。
            </div>
            <Row justify="center">
              <LinkButton history={history} />
            </Row>
          </div>
        </ModalContent>
      );
    },
    // okText: '',
    onCancel: () => {
      form && formName && form.resetFields([`${formName}`]);
    },
  });

  //   return false;
  // } else {
  //   return true;
  // }
  return false;
};
