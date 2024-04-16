using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Tasks_FilterNames
    {
        [Key]
        public int Id { get; set; }
        public int TasksId { get; set; }
        public int FilterNamesId { get; set; }

        [JsonIgnore]
        public Tasks? Tasks {  get; set; }
        public FilterNames FilterNames { get; set; }
    }
}
