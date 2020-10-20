using Application.Activities;
using AutoMapper;
using Domain;

namespace Application
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUSer.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUSer.DisplayName));

        }
    }
}
