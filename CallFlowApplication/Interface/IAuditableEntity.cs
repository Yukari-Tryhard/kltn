namespace CallFlowApplication.Interface
{
    public interface IAuditableEntity
    {
        DateTime Created { get; set; }
        int CreatedBy { get; set; }
        DateTime? LastModified { get; set; }
        int LastModifiedBy { get; set; }
    }
}
