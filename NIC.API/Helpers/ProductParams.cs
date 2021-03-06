namespace NIC.API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } =1 ;
        private int pageSize = 12;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize  = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        
        public string Name { get; set; }
        public string Sort { get; set; }
        public string Dir { get; set; }
        

    }
}