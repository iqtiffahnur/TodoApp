namespace TodoApp.Core.Entities
{
    public class TodoItem
    {
        public int Id { get; set; }             // Unique identifier
        public string Title { get; set; }       // What to do
        public bool IsCompleted { get; set; }   // Done or not
    }
}