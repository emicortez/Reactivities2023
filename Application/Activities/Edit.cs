using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Command(Activity Activity)
            {
                this.Activity = Activity;
            }

            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Activity.Id);

                //if (activity == null)
                //    throw new RestException(System.Net.HttpStatusCode.NotFound, new { activity = "Not Found" });

                //activity.Title = request.Activity.Title ?? activity.Title;
                //activity.Category = request.Activity.Category;
                //activity.City = request.Activity.City;
                //activity.Date = request.Activity.Date;
                //activity.Venue = request.Activity.Venue;
                //activity.Description = request.Activity.Description;

                _mapper.Map(request.Activity, activity);

                var success = await _dataContext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
