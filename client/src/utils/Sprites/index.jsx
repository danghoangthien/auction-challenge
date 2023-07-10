import { Link } from 'react-router-dom';

// ANTD
import { Button, Col, Descriptions, Image, Row, Space, Tooltip } from 'antd';

import { StyledSegmented } from 'styles/Element.style';
import {
  DescriptionStyle,
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledDotList,
  StyledFormAutoComplete,
  StyledFormCheckbox,
  StyledFormCourseRadio,
  StyledFormElementContainer,
  StyledFormHelper,
  StyledFormInput,
  StyledFormInputNumber,
  StyledFormLabel,
  StyledFormLabelRequired,
  StyledFormRadio,
  StyledFormRadioButton,
  StyledFormRadioButtonGroup,
  StyledFormRadioGroup,
  StyledFormRadioGroupHorizontal,
  StyledFormSelect,
  StyledHelper,
  StyledInput,
  StyledInputNumber,
  StyledInputPassword,
  StyledInputWrapper,
  StyledLabel,
  StyledNavigation,
  StyledRangePicker,
  StyledRequired,
  StyledSelect,
  StyledSettingLabel,
  StyledTextarea,
} from 'styles/FormElement.style';
// CONST
import { DANGER_COLOR, TEXT_COLOR, TEXT_GRAY_COLOR } from 'styles/StyleConstants';

const InfoIcon = () => (
  <span
    className="material-symbols-outlined fill-icon"
    style={{ fontSize: 13, display: 'flex', color: TEXT_COLOR, alignItems: 'center' }}
  >
    info
  </span>
);

const SettingsInputContainer = ({ children, label }) => {
  return (
    <>
      {label && (
        <Col span={24}>
          <Space align="center" gap={10}>
            {label}
          </Space>
        </Col>
      )}
      {children && (
        <>
          <Col style={{ marginTop: 4 }} span={24}>
            {children}
          </Col>
        </>
      )}
    </>
  );
};

const SettingsInputWrapper = ({ children, label }) => {
  return <StyledInputWrapper size={16}>{children}</StyledInputWrapper>;
};

const SettingLabel = ({ label, required, info }) => (
  <StyledLabel>
    <Space size={4}>
      {required && <StyledRequired>{'*'}</StyledRequired>}
      <>{label}</>
      {info && <>{info}</>}
    </Space>
  </StyledLabel>
);

const SettingInfoLabel = ({ label, required, info = null, url = null, overlayStyle = {} }) => (
  <StyledSettingLabel>
    <SettingLabel
      required={required || false}
      label={label}
      info={
        <a href={url} target="_blank" rel="noreferrer">
          <Tooltip title={info || label} overlayStyle={{ ...overlayStyle }}>
            <Row>
              <InfoIcon />
            </Row>
          </Tooltip>
        </a>
      }
    />
  </StyledSettingLabel>
);

const SettingInput = ({ placeholder, required, ...rest }) => (
  <StyledInput className={required && 'required'} placeholder={placeholder} {...rest} />
);

const SettingInputNumber = ({ placeholder, required, ...rest }) => (
  <StyledInputNumber className={required && 'required'} placeholder={placeholder} {...rest} />
);

const SettingTextarea = ({ placeholder, required, ...rest }) => (
  <StyledTextarea className={required && 'required'} placeholder={placeholder} {...rest} />
);

const SettingSelect = ({ placeholder, required, ...rest }) => (
  <StyledSelect className={required && 'required'} placeholder={placeholder} {...rest} />
);

const SettingCheckbox = ({ ...rest }) => <StyledCheckbox {...rest} />;

const SettingRangePicker = ({ placeholder, ...rest }) => (
  <StyledRangePicker placeholder={placeholder} {...rest} />
);

const SettingHepler = ({ placeholder, ...rest }) => (
  <StyledHelper placeholder={placeholder} {...rest} />
);

const BoldLabel = ({ label, ...rest }) => {
  return (
    <span
      style={{
        fontWeight: 600,
        ...rest?.style,
      }}
    >
      {label}
    </span>
  );
};

const CustomSegmented = () => {
  return <StyledSegmented />;
};

//申し込みフォーム用・Payment Page
const FormLabel = ({ label, required, info }) => (
  <StyledFormLabel>
    <Space size={4}>
      <>{label}</>
      {required && <StyledFormLabelRequired>{'必須'}</StyledFormLabelRequired>}
      {info && <>{info}</>}
    </Space>
  </StyledFormLabel>
);

const FormRadio = ({ value, label, image, required, fontSize, gap, ...rest }) => (
  <StyledFormRadio value={value} {...rest}>
    <Space direction="vertical" size={gap}>
      <div className="label" style={{ fontSize: fontSize }}>
        {label}
      </div>
      {image && <Image preview={false} src={image} />}
    </Space>
  </StyledFormRadio>
);

const FormCourseRadio = ({
  value,
  label,
  image,
  required,
  fontSize,
  money,
  stock,
  description,
  ...rest
}) => {
  return (
    <StyledFormCourseRadio
      value={value}
      {...rest}
      className={`${stock !== null && Number(stock) === 0 && 'disabled'} course-radio`}
      disabled={stock !== null && Number(stock) === 0}
    >
      <div className="label" style={{ fontSize: fontSize }}>
        <Descriptions
          title={label}
          colon={false}
          size="small"
          labelStyle={{ color: '#737373', fontWeight: '500', fontSize: '13px' }}
          contentStyle={{ fontWeight: '700', fontSize: '15px' }}
        >
          <Descriptions.Item span={1} label="金額">
            {money}円
          </Descriptions.Item>
          <Descriptions.Item span={1} label="在庫">
            {stock ? (stock === 0 ? '受付終了' : stock) : '無制限'}
          </Descriptions.Item>
        </Descriptions>
        <div className="description">{description}</div>
      </div>
      {image && (
        <div>
          <div className="thumb-wrapper">
            <img src={image} alt="" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </StyledFormCourseRadio>
  );
};

const FormRadioGroup = ({ children, defaultValue, ...rest }) => (
  <StyledFormRadioGroup defaultValue={defaultValue} {...rest}>
    {children}
  </StyledFormRadioGroup>
);

const FormRadioGroupHorizontal = ({ children, defaultValue, ...rest }) => (
  <StyledFormRadioGroupHorizontal defaultValue={defaultValue} {...rest}>
    {children}
  </StyledFormRadioGroupHorizontal>
);

const FormRadioButton = ({ value, label, image, required, ...rest }) => (
  <StyledFormRadioButton value={value} {...rest}>
    {label}
  </StyledFormRadioButton>
);

const FormRadioButtonGroup = ({ children, ...rest }) => (
  <StyledFormRadioButtonGroup {...rest}>{children}</StyledFormRadioButtonGroup>
);

const FormInputNumber = ({ placeholder, required, ...rest }) => (
  <StyledFormInputNumber className={required && 'required'} placeholder={placeholder} {...rest} />
);

const FormInput = ({ placeholder, required, center, ...rest }) => (
  <StyledFormInput
    className={`${required && 'required'} ${center && 'center'}`}
    placeholder={placeholder}
    {...rest}
  />
);

const FormSelect = ({ placeholder, required, ...rest }) => (
  <StyledFormSelect className={required && 'required'} placeholder={placeholder} {...rest} />
);

const FormAutoComplete = ({ placeholder, required, children, ...rest }) => {
  return (
    <StyledFormAutoComplete
      className={required && 'required'}
      placeholder={placeholder}
      {...rest}
    />
  );
};

const FormCheckbox = ({ placeholder, required, ...rest }) => (
  <StyledFormCheckbox className={required && 'required'} placeholder={placeholder} {...rest} />
);

const VerticalCheckboxContainer = ({ placeholder, required, ...rest }) => (
  <StyledCheckboxContainer className={required && 'required'} placeholder={placeholder} {...rest} />
);

const FormHepler = ({ placeholder, ...rest }) => (
  <StyledFormHelper placeholder={placeholder} {...rest} />
);

const FormElementContainer = ({ children, defaultValue, ...rest }) => (
  <StyledFormElementContainer>{children}</StyledFormElementContainer>
);

const HorizontalInputContainer = ({ children, label }) => {
  return (
    <>
      <Col className="item mb-1" span={24}>
        <Space align="center">{label}</Space>
      </Col>
      <Col className="item" span={24}>
        {children}
      </Col>
    </>
  );
};

const DraggableInputItem = ({ index, count, InputComponent, onRemove = () => {} }) => (
  <Space align="center">
    <span className="material-symbols-outlined" style={{ color: TEXT_GRAY_COLOR }}>
      menu
    </span>
    {InputComponent}
    {/* <Badge
      count={'99'}
      className="roboto-mono"
      style={{ backgroundColor: LIGHT_GRAY_COLOR, color: TEXT_GRAY_COLOR }}
    /> */}
    <span
      onClick={() => onRemove(index)}
      className="material-symbols-outlined fill-icon"
      style={{ color: DANGER_COLOR, fontSize: '20px', display: 'flex', cursor: 'pointer' }}
    >
      delete
    </span>
  </Space>
);

const CopiableText = ({ children }) => {
  return (
    <Row>
      <Col span={24}>{children}</Col>
      {/* <Col type="flex" align="right" sm={24} md={12} lg={12}>
        <CopyOutlined
          className="display-inline-flex"
          style={{ color: '#c0c0c0' }}
          onClick={() => {}}
        />
      </Col> */}
    </Row>
  );
};

const SettingInputPassword = ({ placeholder, ...rest }) => (
  <StyledInputPassword placeholder={placeholder} {...rest} />
);

const Navigation = ({ setMode, label, identityLabel, id, listMode }) => {
  return (
    <StyledNavigation className="mb-6" size={24}>
      <Button
        className="icon-btn less-shadow-btn"
        icon={<span className="material-symbols-outlined fill-icon">chevron_left</span>}
        onClick={() => setMode(listMode)}
      >
        {'一覧へ'}
      </Button>
      <Row align="middle">
        <span style={{ color: TEXT_GRAY_COLOR }}>{label}</span>
        <span className="mx-2">{'/'}</span>
        <span>
          {identityLabel}
          {' : '}
          {id}
        </span>
      </Row>
    </StyledNavigation>
  );
};

const DescriptionContainer = ({ children, mode, setMode, title }) => (
  <DescriptionStyle className="no-border">
    <Descriptions title={title} bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
      {children}
    </Descriptions>
  </DescriptionStyle>
);

const DotList = ({ children, ...rest }) => {
  return <StyledDotList {...rest}>{children}</StyledDotList>;
};

export {
  SettingsInputContainer,
  SettingLabel,
  SettingInfoLabel,
  SettingInput,
  SettingTextarea,
  SettingSelect,
  SettingRangePicker,
  SettingsInputWrapper,
  SettingHepler,
  SettingInputPassword,
  SettingInputNumber,
  BoldLabel,
  CustomSegmented,
  FormLabel,
  FormRadio,
  FormCourseRadio,
  FormInputNumber,
  FormRadioGroup,
  FormRadioButton,
  FormRadioButtonGroup,
  FormInput,
  FormCheckbox,
  FormSelect,
  FormAutoComplete,
  FormHepler,
  FormElementContainer,
  FormRadioGroupHorizontal,
  HorizontalInputContainer,
  InfoIcon,
  VerticalCheckboxContainer,
  DraggableInputItem,
  CopiableText,
  Navigation,
  DescriptionContainer,
  SettingCheckbox,
  DotList,
};
