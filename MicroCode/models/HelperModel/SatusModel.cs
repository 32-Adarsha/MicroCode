using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace MicroCode.models
{
    public class StatusModel {
        public int id { get; set; }
        public string description { get; set; }
    }

    public class checkModel {
        public StatusModel status { get; set; }
    }
}