using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new RestExceptions(System.Net.HttpStatusCode.NotFound, new { activity = "Not Found" });//Exception("Could not find activity");
                }
                _context.Activities.Remove(activity);
                var success = await _context.SaveChangesAsync() > 0;//it will return the int(no of changes saves)
                if (success)
                {
                    return Unit.Value; //empty object
                }
                else
                {
                    throw new Exception("problem saving new activity");
                }
            }
        }
    }
}