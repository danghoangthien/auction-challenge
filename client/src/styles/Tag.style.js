import Tag from 'antd/es/tag';
import styled from 'styled-components/macro';

import {
  BLUE_COLOR,
  EXTRA_LIGHT_BLUE_COLOR,
  EXTRA_LIGHT_ORANGE_COLOR,
  EXTRA_LIGHT_PINK_COLOR,
  LIGHT_BLUE_COLOR,
  LIGHT_ORANGE_COLOR,
  LIGHT_PINK_COLOR,
  ORANGE_COLOR,
  PINK_COLOR,
} from 'styles/StyleConstants';
import { PROJECT_PAYMENT_TYPES, PROJECT_TYPES } from 'utils/consts';

export const StyledDonationTypeTag = styled(Tag)`
  &.once {
    color: ${BLUE_COLOR};
    background: ${EXTRA_LIGHT_BLUE_COLOR};
    border: 1px solid ${LIGHT_BLUE_COLOR};
  }
  &.monthly {
    color: ${ORANGE_COLOR};
    background: ${EXTRA_LIGHT_ORANGE_COLOR};
    border: 1px solid ${LIGHT_ORANGE_COLOR};
  }
  &.yearly {
    color: ${PINK_COLOR};
    background: ${EXTRA_LIGHT_PINK_COLOR};
    border: 1px solid ${LIGHT_PINK_COLOR};
  }
  &.単発 {
    color: ${BLUE_COLOR};
    background: ${EXTRA_LIGHT_BLUE_COLOR};
    border: 1px solid ${LIGHT_BLUE_COLOR};
  }
  &.毎月 {
    color: ${ORANGE_COLOR};
    background: ${EXTRA_LIGHT_ORANGE_COLOR};
    border: 1px solid ${LIGHT_ORANGE_COLOR};
  }
  &.毎年 {
    color: ${PINK_COLOR};
    background: ${EXTRA_LIGHT_PINK_COLOR};
    border: 1px solid ${LIGHT_PINK_COLOR};
  }
`;

export const StyledProjectTypeTag = styled(Tag)`
  color: ${props => PROJECT_TYPES[props.projectType][3]};
  background: ${props => PROJECT_TYPES[props.projectType][1]};
  border: 1px solid ${props => PROJECT_TYPES[props.projectType][2]};
  margin-right: 0px;
`;

export const StyledProjectPaymentTypeTag = styled(Tag)`
  color: #ffffff;
  background: ${props => PROJECT_PAYMENT_TYPES[props.projectPaymentType][1]};
  border: 1px solid ${props => PROJECT_PAYMENT_TYPES[props.projectPaymentType][1]};
  border-radius: 2px;
  margin-right: 0px;
`;
