using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Command(Activity Activity)
            {
                this.Activity = Activity;
            }

            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                await _dataContext.AddAsync(request.Activity);

                var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create Activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
