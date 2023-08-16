using Newtonsoft.Json;
using XAct;

namespace CallFlowUI.Module
{
    public static class JSONModule
    { 
        public static string fromJSONClassToJSX(string json)
        {
            ClassJson classJson = JsonConvert.DeserializeObject<ClassJson>(json);
            string jsxString = $"<ClassNameText uniqueId=\"{classJson?.name.ToBase64()}\" description=\"{classJson?.description}\" name=\"{classJson?.name}\" editable={{false}}/>";
            if (classJson?.methods != null)
            {
                foreach (MethodJson method in classJson?.methods)
                {
                    jsxString += $"<MethodNameText uniqueId=\"{method?.name.ToBase64()}\" description=\"{method?.description}\" name=\"{method?.name}\" editable={{false}}/>";
                    if (method.parameters != null)
                    {
                        foreach (ParamJson param in method?.parameters)
                        {
                            jsxString += $"<ParamText uniqueId=\"{param?.name.ToBase64()}\" description=\"{param?.description}\" name=\"{param?.name}\" type=\"{param?.type}\" editable={{false}}/>";
                        }
                    } 
                }
            }
            
            return jsxString;
        }

        public static string fromJSONMethodToJSX(string json)
        {
            MethodJson methodJson = JsonConvert.DeserializeObject<MethodJson>(json);
            string jsxString = $"<MethodNameText uniqueId=\"{methodJson?.name.ToBase64()}\" description=\"{methodJson?.description}\" name=\"{methodJson?.name}\" editable={{false}}/>";
            if (methodJson?.parameters != null)
            {
                foreach (ParamJson param in methodJson?.parameters)
                {
                    jsxString += $"<ParamText uniqueId=\"{param?.name.ToBase64()}\" description=\"{param?.description}\" name=\"{param?.name}\" type=\"{param?.type}\" editable={{false}}/>";
                }
            }
            return jsxString;
        }
    }

    public class ClassJson
    {
        public string type;
        public List<MethodJson> methods;
        public string name;
        public string description;
    }

    public class MethodJson
    {
        public string type;
        public string name;
        public string returning;
        public List<ParamJson> parameters;
        public string description;
    }

    public class ParamJson
    {
        public string type;
        public string name;
        public string description;
    }
}
