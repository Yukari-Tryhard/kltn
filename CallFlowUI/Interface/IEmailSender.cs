namespace CallFlowUI.Interface
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject);
    }
}
