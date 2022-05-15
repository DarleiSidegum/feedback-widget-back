import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from '../adapters/mail-adapter';

interface SubmitFeedbackServiceRequest{
    type: string;
    commment: string;
    screenshot?: string;
}   

export class SubmitFeedbackService{
    constructor (
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackServiceRequest){
        const {type, commment, screenshot} = request;

        if(!type){
            throw new Error('Type is required');
        }
        if(!commment){
            throw new Error('Comment is required');
        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format');
        }

        await this.feedbackRepository.create({
            type, 
            commment, 
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family:sans-serif; font-size: 16px; color:#111">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${commment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}