using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace SignalRChat
{
    [HubName("MY_Hub")] // NOTE you can set hubName explicitaly with CASE
    public class ChatHub : Hub  // NOTE on client side use <hubName> CAMELCASE!!!
    {
        public void Send(string name, string message) { // NOTE on client side use <hub>.server.send(...) CAMELCASE!!!
        //public void Send(MessageModel msg) { // NOTE calling server passing COMPLEX object using ModelBinder
            // Call the addNewMessageToPage method to update clients. 
            // Clients.All.addNewMessageToPage(name, message); // NOTE client method name === camelCase  THE SAME CASE!!!
            var msg = new MessageModel
            {
                SentBy = Context.ConnectionId,
                Name = name,
                Text = message
            };
            Clients.AllExcept(msg.SentBy).addNewMessageToPage(msg); // NOTE calling client passing COMPLEX object using ModelBinder + JSON.NET serializer to hide SentBy property
        }


        [HubMethodName("ConnID")] // NOTE: Specify method name for client-side calling: <hub>.server.ConnID().done(...)
        public Task<string> _ConnectionID() {
            return Task.Run(() => Context.ConnectionId); //simulate async work, but client-side return is always promise 
        }
    }

    //NOTE: camelCase is ONLY for hubName and methodName, Complex object/model KEEP CASE!!! Or you can explicit it using JSONProperty("propName")
    public class MessageModel {
        // We declare Name and Message as lowercase with 
        // JsonProperty to sync the client and server models
        [JsonProperty("name")] // set camelCase prop
        public string Name { get; set; }
        [JsonProperty("message")] //explicit different
        public string Text { get; set; }
        // We don't want the client to get the "SentBy" property
        [JsonIgnore] 
        public string SentBy { get; set; }
    }
}