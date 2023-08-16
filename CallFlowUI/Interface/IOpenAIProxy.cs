namespace CallFlowUI.Interface
{
    public interface IOpenAIProxy
    {
        Task<string> SendChatMessage(string message, bool isMockup);
    }
}
