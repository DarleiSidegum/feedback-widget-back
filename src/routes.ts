import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import { SubmitFeedbackService } from './services/submit-feedback.service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repositories';
import { NodemailerMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();




routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailerAdapter = new NodemailerMailerAdapter();
    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailerAdapter
    )

    await submitFeedbackService.execute({
        type, 
        comment, 
        screenshot
    })
   

    return res.status(201).send();
})