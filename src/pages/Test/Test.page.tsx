import React, { memo, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQuestionsByCourseId } from '../../store/apis/testQuestions';
import { Controller, useForm } from 'react-hook-form';
import { QuestionType } from '../../store/slices/testQuestions';

const getQuestionDefaultValues = (questions: QuestionType[]) => {
  return questions.reduce((acc: { [key: string]: string }, question) => {
    const key = `question_${question.id}`;
    acc[key] = '';
    return acc;
  }, {});
};

export const Test = memo(() => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state) => state.testQuestions.questionArray,
  );

  const questionsDefaultValues = getQuestionDefaultValues(questions);

  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
    reset,
    getValues,
  } = useForm({
    defaultValues: questionsDefaultValues,
  });

  useEffect(() => {
    dispatch(getQuestionsByCourseId(id));
  }, []);

  const onSubmit = (data: Record<string, string>) => {
    const countOfRightAnswers = questions.reduce(
      (acc, { answer, id }) =>
        data[`question_${id}`] === answer ? acc + 1 : acc,
      0,
    );
    const answerPercent = countOfRightAnswers / questions.length;

    let message = '';

    if (answerPercent < 0.3)
      message = 'Курс не освоен, начните изучение курса заново';
    else if (answerPercent < 0.8)
      message = 'Курс освоен удовлетворительно, повторите пройденный материал';
    else if (answerPercent < 0.8)
      message =
        'Курс освоен хорошо, повторите те темы, в которых у вас возникли ошибки';
    else message = 'Курс освоен отлично, вы успешно усвоили материал';

    setOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  const onSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const userAnswersObject = getValues();

  return (
    <Container component="main" fixed>
      {questions.length !== 0 ? (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          display="grid"
          gap={2}
        >
          {questions.map(
            ({ id, options, answer, description }, questionIndex) => (
              <Card variant="outlined" key={id}>
                <Box p={2} display="grid" gridTemplateRows="min-content 1fr">
                  <Typography variant="h6" fontWeight="bold" gridColumn="1 / 3">
                    {`${questionIndex + 1}. ${description}`}
                  </Typography>
                  <Controller
                    name={`question_${id}`}
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <RadioGroup {...field}>
                          {options.map((label, optionsIndex) => (
                            <FormControlLabel
                              key={optionsIndex}
                              value={label}
                              control={<Radio disabled={isSubmitted} />}
                              label={label}
                            />
                          ))}
                        </RadioGroup>
                        {isSubmitted &&
                          (!userAnswersObject[`question_${id}`] ||
                            userAnswersObject[`question_${id}`] !== answer) && (
                            <FormHelperText
                              sx={{
                                fontSize: '16px',
                              }}
                              error={true}
                            >
                              {`Правильный ответ: ${answer}`}
                            </FormHelperText>
                          )}
                      </Box>
                    )}
                  />
                </Box>
              </Card>
            ),
          )}
          <Button type="submit" variant="contained" sx={{ pt: 1, pb: 1 }}>
            Отправить
          </Button>
        </Box>
      ) : (
        <Typography variant="h5">Тестов пока нет</Typography>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={onSnackbarClose}
      >
        <Alert severity="info">{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
});
