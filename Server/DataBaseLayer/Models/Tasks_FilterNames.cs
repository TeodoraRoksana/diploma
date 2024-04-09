namespace Server.Models
{
    public class Tasks_FilterNames
    {
        public int Id { get; set; }
        public int TasksId { get; set; }
        public int FilterNamesId { get; set; }

        public Tasks Tasks {  get; set; }
        public List<FilterNames> FilterNames { get; set; }
    }
}
