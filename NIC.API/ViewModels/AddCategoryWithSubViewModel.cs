using System.Collections.Generic;

namespace NIC.API.ViewModels
{
    public class AddCategoryWithSubViewModel
    {
        public string Name { get; set; }
        public IEnumerable<string> SubCategoryName { get; set; }
    }

    
}