package com.abm.pos.ABMPos.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;

/**
 * Created by asp5045 on 3/26/17.
 */

@Component
public class EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    public EmailStatus sendPlainText(String to, String subject, String text) {
        return sendM(to, subject, text, false);
    }

    public EmailStatus sendHtml(String to, String subject, String htmlBody) {
        return sendM(to, subject, htmlBody, true);
    }

    public EmailStatus sendM(String to, String subject, String text, Boolean isHtml) {
        try {
            MimeMessage mail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, isHtml);
//            helper.addAttachment("eyebrow.jpg", new ClassPathResource("eyebrow.jpg"));
//            String inlineImage = "<img src=\"/resources/static/images/eyebrow.jpg\" />";
//            helper.setText(inlineImage + mail.getContent(), true);
            javaMailSender.send(mail);
            System.out.println("Send email '{}' to: {}" + subject + to);
            return new EmailStatus(to, subject, text).success();
        } catch (Exception e) {
            System.out.println(String.format("Problem with sending email to: {}, error message: {}", to, e.getMessage()));
            return new EmailStatus(to, subject, text).error(e.getMessage());
        }
    }
}
