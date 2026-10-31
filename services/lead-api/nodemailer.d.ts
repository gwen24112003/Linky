// Types minimaux de nodemailer, limités à ce que le service utilise (évite d'ajouter @types/nodemailer).
declare module 'nodemailer' {
  export interface SendMailOptions {
    from?: string;
    to?: string;
    replyTo?: string;
    subject?: string;
    text?: string;
    html?: string;
    headers?: Record<string, string>;
  }
  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<{ messageId: string }>;
  }
  const nodemailer: { createTransport(options: Record<string, unknown>): Transporter };
  export default nodemailer;
}
