namespace AdminApplication
{
    /**
     * @type Class:Entry 
     * @name Entry
     * @description test description for actual demo
     */
    public class Entry
    {
        /**
         * @type Param:string
         * @name Name
         * @of   Entry
         * @description param description for actual demo
         */

        public string  Name { get; set; }
        /**
         * @type Method:string
         * @name GetMockupName
         * @description Get mockup name that take input as lang. If vn then return Nguyen Trong Tin, If en then return Lisabel Hogwart
         * @return A mockup name
         * @@type Param:string
         * @@name lang
         * @@description language that this mockup function will take
         */

        public string GetMockupName(string lang)
        {
            if (lang == "vn")
            {
                return "NGUYEN TRONG TIN";

            }
            else if (lang == "en")
            {
                return "Lisabel Hogwart";
            }
            else
            {
                return "SOME NAME";
            }
        }
    }
}