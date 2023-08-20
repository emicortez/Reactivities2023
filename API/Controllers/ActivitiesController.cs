using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet] //api/activities
    public async Task<IActionResult> GetActivities()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }

    [HttpGet("{id}")] //api/activities/fdfasfsdsf
    public async Task<IActionResult> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query(id)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return HandleResult(await Mediator.Send(new Create.Command(activity)));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;

        return HandleResult(await Mediator.Send(new Edit.Command(activity)));
    }

    [HttpDelete("{id}")]
    //[Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
}
