using System.Linq;
using AutoMapper;
using NIC.API.Models;
using NIC.API.ViewModels;

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


            CreateMap<User, UserToReturnViewModel>().ReverseMap();
            CreateMap<User, UserForRegisterViewModel>().ReverseMap();
            CreateMap<CartItemsToReturnViewModel, Cart_Items>().ReverseMap()
            .ForMember(dest => dest.productName, opt => opt.MapFrom(src => src.Product.Name));


            
        }
    }
}