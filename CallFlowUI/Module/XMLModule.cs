sing Newtonsoft.Json;
using System.Text;
using System.Threading.Channels;
using System.Xml;
using System.Xml.Linq;

namespace CallFlowUI.Module
{
    public static class XMLModule
    {
        public static string XMLToJSONString(string xmlData)
        {
            XDocument doc = XDocument.Parse(xmlData);
            var jsonResult = new
            {
                package = (string)doc.Root.Element("element").Element("package"),
                classes = new List<object>(),
                methods = new List<object>()
            };

            foreach (XElement element in doc.Descendants("element"))
            {
                var item = new
                {
                    name = (string)element.Element("name"),
                    group = (string)element.Element("group"),
                    summary = (string)element.Element("summary")
                };

                switch ((string)element.Element("type"))
                {
                    case "TypeInfo":
                    case "Class":
                        jsonResult.classes.Add(item);
                        break;
                    case "Method":
                        var methodItem = new
                        {
                            name = item.name,
                            group = item.group,
                            summary = item.summary,
                            returnParameter = ((string)element.Element("returns")).Replace("A System.", ""),
                            parameters = new List<object>()
                        };
                        if (element.Element("param") != null)
                        {
                            methodItem.parameters.Add(new
                            {
                                name = (string)element.Element("param").Attribute("name"),
                                summary = (string)element.Element("param")
                            });
                        }
                        jsonResult.methods.Add(methodItem);
                        break;
                }
            }
            string jsonString = JsonConvert.SerializeObject(jsonResult, Newtonsoft.Json.Formatting.Indented);
            return jsonString;
        }

        /**
        * @type Method:string[]
        * @name ParseXMLToJSX
        * @description This will map xml and return JSX that supported in the CallFlow browser
        * @return A string array that contain all JSX member. Currently only support Class and Method
        * @@type Param:string
        * @@name xml
        * @@description The xml to check
        * @@type Param:string
        * @@name interfaceStartIndex
        * @@description This is the start character to indicate a Interface
        */
        public static string[] ParseXMLToJSX(string xml, string interfaceStartIndex)
        {
            var xDoc = XDocument.Parse(xml);
            var elements = xDoc.Descendants("element");
            var jsxElements = new List<string>();

            foreach (var element in elements)
            {
                var name = element.Attribute("name")?.Value ?? "";
                var summary = element.Element("summary")?.Value ?? "";
                var paramsElement = element.Elements("param")
                                           .Select(x => (type: x.Attribute("type")?.Value ?? "",
                                                         name: x.Attribute("name")?.Value ?? "",
                                                         description: ""))
                                           .ToList();
                var returnType = element.Element("returns")?.Element("type")?.Value ?? "";
                var returnDescription = element.Element("returns")?.Element("description")?.Value ?? "";

                var jsxString = new StringBuilder();
                if (element.Element("type").Value == "Method")
                {
                    string appendString = paramsToString(paramsElement);
                    jsxString.Append($"<MethodNameText name=\"{name}\" params={appendString} return={{{{type:\"{returnType}\",description:\"{returnDescription}\"}}}} editable={{false}}></MethodNameText>");
                }
                else if (element.Element("type").Value == "TypeInfo")
                {
                    if (element.Element("name").Value.StartsWith(interfaceStartIndex))
                    {
                        jsxString.Append($"<InterfaceNameText name=\"{name}\" description=\"{summary}\" editable={{false}}></InterfaceNameText>");
                    }
                    else
                    {
                        jsxString.Append($"<ClassNameText name=\"{name}\" description=\"{summary}\" editable={{false}}></ClassNameText>");
                    }
                }
                jsxElements.Add(jsxString.ToString().Replace("\\",""));
            }

            return jsxElements.ToArray();
        }

        private static string paramsToString(List<(string type, string name, string description)> parameters)
        {
            var paramStrings = parameters.Select(p => $"{{type: \"{p.type}\", name:\"{p.name}\", description: \"{p.description}\"}}");
            string finalString = "{[" +  string.Join(", ", paramStrings) + "]}";
            return finalString;
        }

        public static string CSharpXMLToString(string xmlString)
        {
            try
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(xmlString);

                string jsonStringSerialize = JsonConvert.SerializeXmlNode(xmlDoc, Newtonsoft.Json.Formatting.Indented, true);
                return jsonStringSerialize;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public static string ReadXmlFile(byte[] fileContent)
        {
            string xmlContent = string.Empty;

            try
            {
                using (MemoryStream stream = new MemoryStream(fileContent))
                using (StreamReader reader = new StreamReader(stream))
                {
                    xmlContent = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error reading XML file: " + ex.Message);
            }

            return xmlContent;
        }


    }


}
