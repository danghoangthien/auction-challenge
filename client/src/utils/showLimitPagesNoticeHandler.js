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

// const LinkButton = ({ history }) => {
//   return (
//     <>
//       <Button
//         type="primary"
//         size="large"
//         style={{ fontWeight: 600 }}
//         onClick={async () => {
//           Modal.destroyAll();
//           await sleep(1000);
//           history.push('/app/contract');
//         }}
//       >
//         契約内容へ
//       </Button>
//     </>
//   );
// };

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

export const showLimitPagesNotice = ({ pages, history }) => {
  error({
    closable: true,
    maskClosable: true,
    width: 480,
    modalRender: () => {
      return (
        <ModalContent>
          <div className="title-wrapper">
            <div className="title">プロジェクト数の上限に達しています</div>
            <span
              className="material-symbols-outlined close-btn"
              onClick={() => {
                Modal.destroyAll();
              }}
            >
              close
            </span>
          </div>
          <div className="content-wrapper">
            <div className="mb-2">
              現在のプランで公開できるプロジェクト数は<strong className="emp">{pages}ページ</strong>
              までです。
              <br />
              新規でプロジェクトを公開するためには、募集中のプロジェクトを非公開にするか、契約内容からプランアップをご検討ください。
            </div>
            <div>
              ※募集期間が終了したクラウドファンディング・マンスリーファンディングはページ数のカウントには含みません。
            </div>
            {/* <Row justify="center">
              <LinkButton history={history} />
            </Row> */}
          </div>
        </ModalContent>
      );
    },
    onCancel: () => {
      Modal.destroyAll();
    },
  });
  return false;
};
