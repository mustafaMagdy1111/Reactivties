using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController:ControllerBase
    {
        private IMediator _Mediator;
        protected IMediator Mediator=>_Mediator??(_Mediator=HttpContext.RequestServices.GetService<IMediator>());
    }
}