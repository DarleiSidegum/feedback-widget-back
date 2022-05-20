import { SubmitFeedbackService } from './submit-feedback.service';

const creatFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    {create: creatFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment'
        })).resolves.not.toThrow();

        expect(creatFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without a type', async () =>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment'
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without a comment', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: ''
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback with an invalid screenshot format', async () =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'bugado',
            screenshot: '123'
        })).rejects.toThrow();
    })
})