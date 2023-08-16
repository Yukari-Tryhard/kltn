using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System;
using YamlDotNet.Core.Tokens;
using System.Reflection.Metadata;

namespace CallFlowUI.Module
{
    public static class FileModule
    {
        /**
         * @type Method:string
         * @name ToBase64String
         * @description this method is designed to read a file name for example: wwwroot/1/project.dll and reutrn its base64String
         * @return string
         * @@type Param:string
         * @@name fileName
         * @@description the full link to file start from root directory which is the project directory
         */
        public static string ToBase64String(string fileName)
        {
            using (FileStream reader = new FileStream(fileName, FileMode.Open))
            {
                byte[] buffer = new byte[reader.Length];
                reader.Read(buffer, 0, (int)reader.Length);
                return Convert.ToBase64String(buffer);
            }
        }

        /**
         * @type Method:void
         * @name ToString
         * @description this method is changed and it no longer work like it first defined.
         * @return It should return string not void
         */
        public static void ToString(string fileName, string serializedFile)
        {
            using (System.IO.FileStream reader = System.IO.File.Create(fileName))
            {
                byte[] buffer = Convert.FromBase64String(serializedFile);
                reader.Write(buffer, 0, buffer.Length);
            }

        }

        /**
         * @type Method:JObject
         * @name CsFileToComment
         * @description This will read an escaped File Content, first it seperate line by \n charracater then for each line it will check for supported characters between multiple lines comment
         * @return JObject that contain all comment information about Class in one file
         * @@type Param:string
         * @@name fileContent
         * @@description this fileContent is a escaped fileContent so it need to be unescaped before use
         */
        public static JObject CsFileToComment(string fileContent)
        {
            var classes = new JArray();

            var lines = fileContent.Split('\n');
            string currentClass = null;
            string currentMethod = null;
            JObject currentClassObj = null;
            JObject currentMethodObj = null;

            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();

                if (trimmedLine.StartsWith("/**"))
                {
                    currentClass = null;
                    currentMethod = null;
                    currentClassObj = null;
                    currentMethodObj = null;
                }
                else if (trimmedLine.StartsWith("* @type Class:"))
                {
                    currentClass = trimmedLine.Substring(trimmedLine.IndexOf(':') + 1).Trim();
                    currentClassObj = new JObject();
                    currentClassObj["type"] = currentClass;
                    currentClassObj["methods"] = new JArray();
                    classes.Add(currentClassObj);
                }
                else if (trimmedLine.StartsWith("* @name"))
                {
                    if (currentClass != null && currentClassObj != null)
                    {
                        var className = trimmedLine.Substring(trimmedLine.IndexOf("me") + 2).Trim();
                        currentClassObj["name"] = className;
                    }
                }
                else if (trimmedLine.StartsWith("* @description"))
                {
                    if (currentClass != null && currentClassObj != null)
                    {
                        var classDescription = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        currentClassObj["description"] = classDescription;
                    }
                    else if (currentMethod != null && currentMethodObj != null)
                    {
                        var methodDescription = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        currentMethodObj["description"] = methodDescription;
                    }
                }
                else if (trimmedLine.StartsWith("* @@type Param:"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramType = trimmedLine.Substring(trimmedLine.IndexOf(':') + 1).Trim();
                        var paramObj = new JObject();
                        paramObj["type"] = paramType;
                        ((JArray)currentMethodObj["params"]).Add(paramObj);
                    }
                }
                else if (trimmedLine.StartsWith("* @@name"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramName = trimmedLine.Substring(trimmedLine.IndexOf('e') + 1).Trim();
                        var lastParamObj = ((JArray)currentMethodObj["params"]).Last;
                        lastParamObj["name"] = paramName;
                    }
                }
                else if (trimmedLine.StartsWith("* @@description"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramDescription = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        var lastParamObj = ((JArray)currentMethodObj["params"]).Last;
                        lastParamObj["description"] = paramDescription;
                    }
                }
                else if (trimmedLine.StartsWith("* @type Method:"))
                {
                    if (currentClass != null && currentClassObj != null)
                    {
                        currentMethod = trimmedLine.Substring(trimmedLine.IndexOf(':') + 1).Trim();
                        currentMethodObj = new JObject();
                        currentMethodObj["type"] = currentMethod;
                        currentMethodObj["params"] = new JArray();
                        ((JArray)currentClassObj["methods"]).Add(currentMethodObj);
                    }
                }
                else if (trimmedLine.StartsWith("* @return"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var methodReturn = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        currentMethodObj["return"] = methodReturn;
                    }
                }
            }

            var result = new JObject();
            result["classes"] = classes;
            return result;
        }
        /**
         * @type Method:JArray
         * @name CsFileToComment
         * @description This will read an escaped File Content, first it seperate line by \n charracater then for each line it will check for supported characters between multiple lines comment
         * @return JArray that contain all JObject about the method information in this file
         * @@type Param:string
         * @@name fileContent
         * @@description this fileContent is a escaped fileContent so it need to be unescaped before use
         */
        public static JArray MethodCommentsToJson(string fileContent)
        {
            var methods = new JArray();

            var lines = fileContent.Split('\n');
            string currentMethod = null;
            JObject currentMethodObj = null;

            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();

                if (trimmedLine.StartsWith("/**"))
                {
                    currentMethod = null;
                    currentMethodObj = null;
                }
                else if (trimmedLine.StartsWith("* @type Method:"))
                {
                    currentMethod = trimmedLine.Substring(trimmedLine.IndexOf(':') + 1).Trim();
                    currentMethodObj = new JObject();
                    currentMethodObj["type"] = currentMethod;
                    currentMethodObj["parameters"] = new JArray();
                    methods.Add(currentMethodObj);
                }
                else if (trimmedLine.StartsWith("* @name"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var methodName = trimmedLine.Substring(trimmedLine.IndexOf("me") + 2).Trim();
                        currentMethodObj["name"] = methodName;
                    }
                }
                else if (trimmedLine.StartsWith("* @description"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var methodDescription = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        currentMethodObj["description"] = methodDescription;
                    }
                }
                else if (trimmedLine.StartsWith("* @@type Param:"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramType = trimmedLine.Substring(trimmedLine.IndexOf(':') + 1).Trim();
                        var paramObj = new JObject();
                        paramObj["type"] = paramType;
                        ((JArray)currentMethodObj["parameters"]).Add(paramObj);
                    }
                }
                else if (trimmedLine.StartsWith("* @@name"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramName = trimmedLine.Substring(trimmedLine.IndexOf('e') + 1).Trim();
                        var lastParamObj = ((JArray)currentMethodObj["parameters"]).LastOrDefault();
                        if (lastParamObj != null)
                        {
                            lastParamObj["name"] = paramName;
                        }
                    }
                }
                else if (trimmedLine.StartsWith("* @@description"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var paramDescription = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        var lastParamObj = ((JArray)currentMethodObj["parameters"]).LastOrDefault();
                        if (lastParamObj != null)
                        {
                            lastParamObj["description"] = paramDescription;
                        }
                    }
                }
                else if (trimmedLine.StartsWith("* @return"))
                {
                    if (currentMethod != null && currentMethodObj != null)
                    {
                        var methodReturn = trimmedLine.Substring(trimmedLine.IndexOf('n') + 1).Trim();
                        currentMethodObj["returning"] = methodReturn;
                                        }
                }
            }

            return methods;
        }

    }
}