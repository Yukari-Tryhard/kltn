using CallFlowUI.Interface;
using Newtonsoft.Json.Linq;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Completions;
using System.Net.Http.Headers;
using System.Text;
using System.Xml.Linq;
using XAct;
using static System.Net.Mime.MediaTypeNames;

namespace CallFlowUI.Module
{
    public class GPTModule : IOpenAIProxy
    {
        private OpenAIAPI api;
        public GPTModule(string apiKey)
        {
            api = new OpenAI_API.OpenAIAPI(apiKey);
        }

        public async Task<string> SendChatMessage(string message, bool isMockup)
        {
            string result = "";
            Random rnd = new Random();
            int random = rnd.Next(0, 2);
            if (isMockup)
            {
                if (random == 0)
                {
                    result = @"
<element name=""Mockup"">
<summary>
    Creates a new CallFlow user.
</summary>
<param name=""command"">The command to create a new CallFlow user.</param>
<returns>A task that represents the asynchronous operation.</returns>
<package>CallFlowUI.Controllers</package>
<group>CallFlowUserController</group>
<type>method</type>
</element>
";
                }
                else
                {
                    result = @"
<element name=Mockup>
<summary>
    Creates a new CallFlow user.
</summary>
<param name=""command"">The command to create a new CallFlow user.</param>
<returns>A task that represents the asynchronous operation.</returns>
<package>CallFlowUI.Controllers</package>
<group>CallFlowUserController</group>
<type>method</type>
</element>
";
                }

                if (!ValidResponse(result.ToString(), message))
                {
                    result = await SendChatMessage(message, true);
                }
                return result;
            }
            //result = await api.Completions.GetCompletion(message);

            /*result = await await api.Completions.StreamCompletionAsync(
    new CompletionRequest(message, OpenAI_API.Models.Model.AdaText, 200, 0.5, presencePenalty: 0.1, frequencyPenalty: 0.1),
    res => ResumeTextbox.Text += res.ToString());*/

            var response = await api.Completions.CreateCompletionAsync(new CompletionRequest(message,
                model: OpenAI_API.Models.Model.DavinciText,
                temperature: 0.5,
                max_tokens: 256));

            if (!ValidResponse(response.ToString(), message))
            {
                var fixResponse = await SendChatMessage(message, false);
                return fixResponse.ToString();
            }
            else
            {
                return response.ToString();
            }
        }

        public bool ValidResponse(string response, string query)
        {
            response = response.Trim();
            if (response.IsNullOrEmpty())
            {
                return false;
            }
            if (!(response.StartsWith("<element") && response.EndsWith("</element>")))
            {
                return false;
            }
            try
            {
                XDocument.Parse(response);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }
}
