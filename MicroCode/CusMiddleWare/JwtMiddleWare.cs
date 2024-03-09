namespace MicroCode.CusMiddleWare {

    public class JwtMiddleware {

        public readonly RequestDelegate _next;
        public JwtMiddleware (RequestDelegate next){
            _next = next;
        }

        public async Task InvokeAsync(HttpContext cntx){

            if (cntx.Request.Cookies["Token"] != null){
                var value = cntx.Request.Cookies["Token"];
                cntx.Request.Headers.Append("Token", String.Format("Bearer {0}", value));
            }

            await _next(cntx);
            
        }


    }









}