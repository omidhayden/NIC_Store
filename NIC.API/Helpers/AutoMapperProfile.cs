using System.Linq;
using AutoMapper;
using NIC.API.Models;
using NIC.API.ViewModels;
using NIC.API.ViewModels.getproducts;

namespace NIC.API.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, GetProductsViewModel>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>src.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Product, AddProductViewModel>().ReverseMap();
            CreateMap<Product, ProductToReturnViewModel>().ReverseMap();
            CreateMap<Product, ProductUpdateViewModel>().ReverseMap();
            CreateMap<Photo, AddPhotoViewModel>();
            CreateMap<Product_SubCategory, AddSubCategoryToProductViewModel>().ReverseMap();
            CreateMap<Product_SubCategory, UpdateSubCategoryToProductViewModel>().ReverseMap();

            CreateMap<AddCategoryWithSubViewModel, Category>();
            
            CreateMap<AddCategoryWithSubViewModel, SubCategory>();
            CreateMap<CategoryForUpdateViewModel, Category>();
       
            


            CreateMap<User, UserToReturnViewModel>().ReverseMap();
            CreateMap<User, UserForRegisterViewModel>().ReverseMap();
            CreateMap<CartItemsToReturnViewModel, Cart_Items>().ReverseMap()
            .ForMember(dest => dest.productName, opt => opt.MapFrom(src => src.Product.Name));




            //Attn: Get product Mapper
            

            CreateMap<Product, GetProductViewModel>()

            .ForMember(dest => dest.ProductSubCategories, opt => opt.MapFrom(src => src.ProductSubCategories));
            CreateMap<Photo, GetPhotoForProduct>().ReverseMap();
           
 
            //It automatically use the second map to map itself. 
            CreateMap<Product_SubCategory, ProductSubCategoryViewModel>()
            
            .ForMember(dest => dest.SubCategoryId, opt => opt.MapFrom(src => src.SubCategoryId))
            .ForMember(dest => dest.SubCategoryName, opt => opt.MapFrom(src => src.SubCategory.Name))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src =>src.SubCategory.Category.Name))
            .ReverseMap();            


            
        }
    }
}