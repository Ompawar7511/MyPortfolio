package com.ompawar.portfolio.service;

import com.ompawar.portfolio.model.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${portfolio.mail.to}")
    private String toEmail;       // owner email

    @Value("${spring.mail.username}")
    private String mailUsername;  // gmail smtp account

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOwnerNotification(ContactMessage message) {

        if (mailUsername == null || mailUsername.trim().isEmpty()) {
            log.warn("SMTP username not configured");
            return;
        }

        try {

            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            true,
                            "UTF-8"
                    );

            // authenticated sender
            helper.setFrom(mailUsername, "Portfolio Contact Form");

            // if owner clicks reply → goes to visitor
            helper.setReplyTo(message.getEmail());

            // owner receives email
            helper.setTo(toEmail);

            helper.setSubject(
                    "New Portfolio Contact: "
                    + message.getSubject()
            );

            String htmlContent =
                    buildOwnerEmailTemplate(message);

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Notification email sent successfully to portfolio owner: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send notification email to owner", e);
        } catch (Exception e) {
            log.error("Unexpected error occurred while sending owner email", e);
        }
    }

    public void sendVisitorAcknowledgment(ContactMessage message) {
        if (mailUsername == null || mailUsername.trim().isEmpty()) {
            log.warn("SMTP username is not configured. Skipping visitor acknowledgment email.");
            return;
        }

        if (message.getEmail() == null || message.getEmail().trim().isEmpty()) {
            log.warn("Visitor email is empty. Skipping acknowledgment email.");
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(mailUsername);
            helper.setTo(message.getEmail());
            helper.setSubject("Thank you for reaching out! | Om Pawar");

            String htmlContent = buildVisitorEmailTemplate(message);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Acknowledgment email sent successfully to visitor: {}", message.getEmail());
        } catch (MessagingException e) {
            log.error("Failed to send acknowledgment email to visitor: {}", message.getEmail(), e);
        } catch (Exception e) {
            log.error("Unexpected error occurred while sending visitor email", e);
        }
    }

    private String buildOwnerEmailTemplate(ContactMessage msg) {
        return "<!DOCTYPE html>" +
               "<html>" +
               "<head>" +
               "  <style>" +
               "    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 20px; }" +
               "    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e1e8ed; }" +
               "    .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: #ffffff; padding: 30px 20px; text-align: center; }" +
               "    .header h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }" +
               "    .content { padding: 30px 20px; }" +
               "    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }" +
               "    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f0f3f6; font-size: 14px; }" +
               "    .info-table td.label { font-weight: bold; color: #718096; width: 30%; }" +
               "    .info-table td.value { color: #2d3748; }" +
               "    .message-box { background-color: #f8fafc; border-left: 4px solid #2a5298; padding: 15px 20px; margin-top: 15px; border-radius: 0 4px 4px 0; }" +
               "    .message-title { font-weight: bold; color: #2a5298; margin-bottom: 8px; font-size: 14px; }" +
               "    .message-text { color: #4a5568; line-height: 1.6; font-size: 15px; white-space: pre-wrap; }" +
               "    .footer { text-align: center; padding: 20px; font-size: 12px; color: #a0aec0; background-color: #fafbfd; border-top: 1px solid #edf2f7; }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class='container'>" +
               "    <div class='header'>" +
               "      <h2>New Contact Submission</h2>" +
               "    </div>" +
               "    <div class='content'>" +
               "      <table class='info-table'>" +
               "        <tr>" +
               "          <td class='label'>Client/Message ID</td>" +
               "          <td class='value' style='font-family: monospace; font-weight: bold; color: #1e3c72;'>" + (msg.getId() != null ? msg.getId() : "N/A") + "</td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Sender Name</td>" +
               "          <td class='value'>" + msg.getName() + "</td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Sender Email</td>" +
               "          <td class='value'><a href='mailto:" + msg.getEmail() + "' style='color: #2a5298; text-decoration: none;'>" + msg.getEmail() + "</a></td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Subject</td>" +
               "          <td class='value'>" + msg.getSubject() + "</td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Submitted At</td>" +
               "          <td class='value'>" + (msg.getTimestamp() != null ? msg.getTimestamp() : "N/A") + "</td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Client IP Address</td>" +
               "          <td class='value' style='font-family: monospace;'>" + (msg.getIpAddress() != null ? msg.getIpAddress() : "N/A") + "</td>" +
               "        </tr>" +
               "        <tr>" +
               "          <td class='label'>Browser / Device</td>" +
               "          <td class='value' style='font-size: 12px; color: #718096; word-break: break-all;'>" + (msg.getUserAgent() != null ? msg.getUserAgent() : "N/A") + "</td>" +
               "        </tr>" +
               "      </table>" +
               "      <div class='message-box'>" +
               "        <div class='message-title'>Message Content:</div>" +
               "        <div class='message-text'>" + msg.getMessage() + "</div>" +
               "      </div>" +
               "    </div>" +
               "    <div class='footer'>" +
               "      Sent automatically by Om Pawar's Portfolio API." +
               "    </div>" +
               "  </div>" +
               "</body>" +
               "</html>";
    }

    private String buildVisitorEmailTemplate(ContactMessage msg) {
        return "<!DOCTYPE html>" +
               "<html>" +
               "<head>" +
               "  <style>" +
               "    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 20px; }" +
               "    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e1e8ed; }" +
               "    .header { background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); color: #ffffff; padding: 35px 20px; text-align: center; }" +
               "    .header h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }" +
               "    .content { padding: 30px 25px; line-height: 1.6; color: #2d3748; }" +
               "    .salutation { font-size: 18px; font-weight: bold; color: #0f2027; margin-bottom: 15px; }" +
               "    .body-text { font-size: 15px; color: #4a5568; margin-bottom: 20px; }" +
               "    .copy-box { background-color: #f8fafc; border-left: 3px solid #2c5364; padding: 12px 18px; border-radius: 0 4px 4px 0; margin: 20px 0; font-style: italic; color: #4a5568; font-size: 14px; }" +
               "    .footer { text-align: center; padding: 20px; font-size: 12px; color: #a0aec0; background-color: #fafbfd; border-top: 1px solid #edf2f7; }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class='container'>" +
               "    <div class='header'>" +
               "      <h2>Message Received!</h2>" +
               "    </div>" +
               "    <div class='content'>" +
               "      <div class='salutation'>Hi " + msg.getName() + ",</div>" +
               "      <div class='body-text'>" +
               "        Thank you for reaching out and visiting my portfolio! I have received your message regarding " +
               "        <strong>\"" + msg.getSubject() + "\"</strong> and will get back to you as soon as possible." +
               "      </div>" +
               "      <div class='body-text'>Here is a copy of your message:</div>" +
               "      <div class='copy-box'>\"" + msg.getMessage() + "\"</div>" +
               "      <div class='body-text' style='margin-top: 25px;'>" +
               "        Best regards,<br/>" +
               "        <strong>Om Pawar</strong>" +
               "      </div>" +
               "    </div>" +
               "    <div class='footer'>" +
               "      This is an automated acknowledgment. Please do not reply directly to this email." +
               "    </div>" +
               "  </div>" +
               "</body>" +
               "</html>";
    }
}
