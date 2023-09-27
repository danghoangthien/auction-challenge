import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Space } from 'antd';

import FormContainer from 'app/components/Layout/FormContainer';
import FormItem from 'app/components/Layout/FormItem';
import QuestionHandler from 'services/OpenAi/QuestionHandler';

interface QuestionFormValues {
  question: string;
}

const OpenAiPage: React.FC = () => {
  const [answer, setAnswer] = useState<string>();
  const [error, setError] = useState<string>();
  //console.log('answer', answer);
  const onFinish = async (values: QuestionFormValues) => {
    try {
      setAnswer('');
      setError('');
      const openAiQuestionHandler = new QuestionHandler();
      const answerFromApi = await openAiQuestionHandler.perform(values);
      setAnswer(answerFromApi);
      // notify
    } catch (error: any) {
      setError(error?.message)
    }
  };

  return (
    <>
      <FormContainer>
        <Form name="registrationForm" onFinish={onFinish}>
          <FormItem
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please enter your question!' }]}
          >
            <Input />
          </FormItem>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ask Open AI
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
      <Space>
        { answer && answer}
        { error && error}
      </Space>
    </>
  );
};

export default OpenAiPage;
