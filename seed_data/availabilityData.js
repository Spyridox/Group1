'use strict';

var today = new Date();
var dates = [];
for (var i = 0; i < 30; ++ i) {
  var d = new Date();
  d.setDate(today.getDate() + i);
  ds = `${d.getUTCFullYear()}-`;
  ds += d.getUTCMonth() + 1 < 10 ? `0${d.getUTCMonth() + 1}-` : `${d.getUTCMonth() + 1}-`;
  ds += d.getUTCDate() < 10 ? `0${d.getUTCDate()}` : `${d.getUTCDate()}`;
  dates.push(ds);
}

var availabilityData = {
  name: 'Availability',
  data: [
    // Freelancer 1
    { day : `${dates[0]}T00:00:00`, begin : `${dates[0]}T00:00:00Z`, end : `${dates[0]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[1]}T00:00:00`, begin : `${dates[1]}T00:00:00Z`, end : `${dates[1]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[2]}T00:00:00`, begin : `${dates[2]}T00:00:00Z`, end : `${dates[2]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[3]}T00:00:00`, begin : `${dates[3]}T00:00:00Z`, end : `${dates[3]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[4]}T00:00:00`, begin : `${dates[4]}T00:00:00Z`, end : `${dates[4]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[5]}T00:00:00`, begin : `${dates[5]}T00:00:00Z`, end : `${dates[5]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[6]}T00:00:00`, begin : `${dates[6]}T00:00:00Z`, end : `${dates[6]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[7]}T00:00:00`, begin : `${dates[7]}T00:00:00Z`, end : `${dates[7]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[8]}T00:00:00`, begin : `${dates[8]}T00:00:00Z`, end : `${dates[8]}T12:00:00Z`, location : `Acquarossa` },
    { day : `${dates[9]}T00:00:00`, begin : `${dates[9]}T00:00:00Z`, end : `${dates[9]}T12:00:00Z`, location : `Acquarossa` },
    // Freelancer 2
    { day : `${dates[0]}T00:00:00`, begin : `${dates[0]}T08:00:00Z`, end : `${dates[0]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[1]}T00:00:00`, begin : `${dates[1]}T08:00:00Z`, end : `${dates[1]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[2]}T00:00:00`, begin : `${dates[2]}T08:00:00Z`, end : `${dates[2]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[3]}T00:00:00`, begin : `${dates[3]}T08:00:00Z`, end : `${dates[3]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[4]}T00:00:00`, begin : `${dates[4]}T08:00:00Z`, end : `${dates[4]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[5]}T00:00:00`, begin : `${dates[5]}T08:00:00Z`, end : `${dates[5]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[6]}T00:00:00`, begin : `${dates[6]}T08:00:00Z`, end : `${dates[6]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[7]}T00:00:00`, begin : `${dates[7]}T08:00:00Z`, end : `${dates[7]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[8]}T00:00:00`, begin : `${dates[8]}T08:00:00Z`, end : `${dates[8]}T20:00:00Z`, location : `Bodio` },
    { day : `${dates[9]}T00:00:00`, begin : `${dates[9]}T08:00:00Z`, end : `${dates[9]}T20:00:00Z`, location : `Bodio` },
    // Freelancer 3
    { day : `${dates[0]}T00:00:00`, begin : `${dates[0]}T12:00:00Z`, end : `${dates[0]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[1]}T00:00:00`, begin : `${dates[1]}T12:00:00Z`, end : `${dates[1]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[2]}T00:00:00`, begin : `${dates[2]}T12:00:00Z`, end : `${dates[2]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[3]}T00:00:00`, begin : `${dates[3]}T12:00:00Z`, end : `${dates[3]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[4]}T00:00:00`, begin : `${dates[4]}T12:00:00Z`, end : `${dates[4]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[5]}T00:00:00`, begin : `${dates[5]}T12:00:00Z`, end : `${dates[5]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[6]}T00:00:00`, begin : `${dates[6]}T12:00:00Z`, end : `${dates[6]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[7]}T00:00:00`, begin : `${dates[7]}T12:00:00Z`, end : `${dates[7]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[8]}T00:00:00`, begin : `${dates[8]}T12:00:00Z`, end : `${dates[8]}T23:59:59Z`, location : `Sorengo` },
    { day : `${dates[9]}T00:00:00`, begin : `${dates[9]}T12:00:00Z`, end : `${dates[9]}T23:59:59Z`, location : `Sorengo` }
// {"begin":"2017-05-05T15:04:50Z","end":"2017-05-05T19:04:50Z","location":"Mbocayaty"},
// {"begin":"2017-05-06T14:58:23Z","end":"2017-05-06T18:58:23Z","location":"Villach"},
// {"begin":"2017-05-05T16:10:25Z","end":"2017-05-05T20:10:25Z","location":"Antonina"},
// {"begin":"2017-05-06T06:06:49Z","end":"2017-05-06T10:06:49Z","location":"Jishan"},
// {"begin":"2017-05-05T11:32:17Z","end":"2017-05-05T15:32:17Z","location":"Ngluwuk"},
// {"begin":"2017-05-07T13:11:03Z","end":"2017-05-07T17:11:03Z","location":"Kharkiv"},
// {"begin":"2017-05-05T18:13:39Z","end":"2017-05-05T22:13:39Z","location":"Urukh"},
// {"begin":"2017-05-06T04:30:36Z","end":"2017-05-06T08:30:36Z","location":"San Pedro"},
// {"begin":"2017-05-07T01:57:26Z","end":"2017-05-07T05:57:26Z","location":"Waru"},
// {"begin":"2017-05-06T16:57:04Z","end":"2017-05-06T20:57:04Z","location":"Potchefstroom"},
// {"begin":"2017-05-05T13:43:12Z","end":"2017-05-05T17:43:12Z","location":"El Cobre"},
// {"begin":"2017-05-05T00:55:52Z","end":"2017-05-05T04:55:52Z","location":"Colmar"},
// {"begin":"2017-05-07T08:02:58Z","end":"2017-05-07T12:02:58Z","location":"Tõrva"},
// {"begin":"2017-05-06T12:17:23Z","end":"2017-05-06T16:17:23Z","location":"Namballe"},
// {"begin":"2017-05-06T15:34:30Z","end":"2017-05-06T19:34:30Z","location":"Nerekhta"},
// {"begin":"2017-05-05T11:16:55Z","end":"2017-05-05T15:16:55Z","location":"Sakon Nakhon"},
// {"begin":"2017-05-05T09:20:43Z","end":"2017-05-05T13:20:43Z","location":"Bendungan"},
// {"begin":"2017-05-06T19:55:48Z","end":"2017-05-06T23:55:48Z","location":"Chinchero"},
// {"begin":"2017-05-05T02:44:07Z","end":"2017-05-05T06:44:07Z","location":"Hal’shany"},
// {"begin":"2017-05-05T11:51:31Z","end":"2017-05-05T15:51:31Z","location":"Rongcheng"},
// {"begin":"2017-05-07T01:54:21Z","end":"2017-05-07T05:54:21Z","location":"Chimoio"},
// {"begin":"2017-05-05T18:34:30Z","end":"2017-05-05T22:34:30Z","location":"San Antonio"},
// {"begin":"2017-05-05T04:41:10Z","end":"2017-05-05T08:41:10Z","location":"Bykhaw"},
// {"begin":"2017-05-05T13:23:35Z","end":"2017-05-05T17:23:35Z","location":"Papakura"},
// {"begin":"2017-05-07T07:12:47Z","end":"2017-05-07T11:12:47Z","location":"Kyaiklat"},
// {"begin":"2017-05-05T14:39:43Z","end":"2017-05-05T18:39:43Z","location":"Keli"},
// {"begin":"2017-05-05T04:08:13Z","end":"2017-05-05T08:08:13Z","location":"Huaqiao"},
// {"begin":"2017-05-05T00:49:35Z","end":"2017-05-05T04:49:35Z","location":"Xindian"},
// {"begin":"2017-05-06T08:24:51Z","end":"2017-05-06T12:24:51Z","location":"Tomingad"},
// {"begin":"2017-05-06T12:17:20Z","end":"2017-05-06T16:17:20Z","location":"Trajouce"},
// {"begin":"2017-05-06T07:49:07Z","end":"2017-05-06T11:49:07Z","location":"Ngondokandawu"},
// {"begin":"2017-05-05T00:11:51Z","end":"2017-05-05T04:11:51Z","location":"Tuwiri Wetan"},
// {"begin":"2017-05-07T02:46:13Z","end":"2017-05-07T06:46:13Z","location":"Kawerau"},
// {"begin":"2017-05-06T20:24:19Z","end":"2017-05-07T00:24:19Z","location":"Maringá"},
// {"begin":"2017-05-07T03:10:52Z","end":"2017-05-07T07:10:52Z","location":"Kidangbang"},
// {"begin":"2017-05-07T05:30:39Z","end":"2017-05-07T09:30:39Z","location":"Gubengairlangga"},
// {"begin":"2017-05-07T22:55:36Z","end":"2017-05-08T02:55:36Z","location":"Pivovarikha"},
// {"begin":"2017-05-07T07:15:29Z","end":"2017-05-07T11:15:29Z","location":"Zhangshi"},
// {"begin":"2017-05-05T04:42:05Z","end":"2017-05-05T08:42:05Z","location":"Thị Trấn Bình Mỹ"},
// {"begin":"2017-05-05T12:13:39Z","end":"2017-05-05T16:13:39Z","location":"Minbu"},
// {"begin":"2017-05-05T15:01:09Z","end":"2017-05-05T19:01:09Z","location":"Rogowo"},
// {"begin":"2017-05-05T18:50:25Z","end":"2017-05-05T22:50:25Z","location":"Znamenskoye"},
// {"begin":"2017-05-07T23:54:01Z","end":"2017-05-08T03:54:01Z","location":"Dimbokro"},
// {"begin":"2017-05-05T06:43:54Z","end":"2017-05-05T10:43:54Z","location":"Ishurdi"},
// {"begin":"2017-05-06T07:31:46Z","end":"2017-05-06T11:31:46Z","location":"Sungayang"},
// {"begin":"2017-05-05T02:20:00Z","end":"2017-05-05T06:20:00Z","location":"Red Hill"},
// {"begin":"2017-05-06T19:25:27Z","end":"2017-05-06T23:25:27Z","location":"Susapaya"},
// {"begin":"2017-05-06T06:22:04Z","end":"2017-05-06T10:22:04Z","location":"Paucar"},
// {"begin":"2017-05-06T19:00:34Z","end":"2017-05-06T23:00:34Z","location":"Ochobo"},
// {"begin":"2017-05-06T07:09:10Z","end":"2017-05-06T11:09:10Z","location":"Ghanzi"},
// {"begin":"2017-05-05T07:09:25Z","end":"2017-05-05T11:09:25Z","location":"Cabaritan East"},
// {"begin":"2017-05-07T02:40:18Z","end":"2017-05-07T06:40:18Z","location":"Puerto de Nutrias"},
// {"begin":"2017-05-07T21:43:02Z","end":"2017-05-08T01:43:02Z","location":"Newmarket"},
// {"begin":"2017-05-05T10:24:55Z","end":"2017-05-05T14:24:55Z","location":"Metsavan"},
// {"begin":"2017-05-07T13:54:11Z","end":"2017-05-07T17:54:11Z","location":"Sayán"},
// {"begin":"2017-05-06T20:11:53Z","end":"2017-05-07T00:11:53Z","location":"Kigoma"},
// {"begin":"2017-05-05T16:12:35Z","end":"2017-05-05T20:12:35Z","location":"Port Hawkesbury"},
// {"begin":"2017-05-05T19:46:08Z","end":"2017-05-05T23:46:08Z","location":"Algueirão"},
// {"begin":"2017-05-07T04:59:36Z","end":"2017-05-07T08:59:36Z","location":"Haapajärvi"},
// {"begin":"2017-05-05T05:36:11Z","end":"2017-05-05T09:36:11Z","location":"Seydi"},
// {"begin":"2017-05-05T12:39:02Z","end":"2017-05-05T16:39:02Z","location":"Cibeuti"},
// {"begin":"2017-05-06T11:57:27Z","end":"2017-05-06T15:57:27Z","location":"Kanugrahan"},
// {"begin":"2017-05-07T04:17:21Z","end":"2017-05-07T08:17:21Z","location":"Glugur Krajan"},
// {"begin":"2017-05-06T11:47:21Z","end":"2017-05-06T15:47:21Z","location":"Saint-Eustache"},
// {"begin":"2017-05-05T07:05:53Z","end":"2017-05-05T11:05:53Z","location":"Hāfizābād"},
// {"begin":"2017-05-06T16:51:36Z","end":"2017-05-06T20:51:36Z","location":"Darvi"},
// {"begin":"2017-05-06T12:07:36Z","end":"2017-05-06T16:07:36Z","location":"Mariefred"},
// {"begin":"2017-05-05T13:28:38Z","end":"2017-05-05T17:28:38Z","location":"Shinan"},
// {"begin":"2017-05-07T08:34:57Z","end":"2017-05-07T12:34:57Z","location":"Ialoveni"},
// {"begin":"2017-05-06T20:08:30Z","end":"2017-05-07T00:08:30Z","location":"Tālīn"},
// {"begin":"2017-05-06T10:12:58Z","end":"2017-05-06T14:12:58Z","location":"Nasavrky"},
// {"begin":"2017-05-06T05:35:17Z","end":"2017-05-06T09:35:17Z","location":"Fomento"},
// {"begin":"2017-05-07T12:57:03Z","end":"2017-05-07T16:57:03Z","location":"Las Vegas"},
// {"begin":"2017-05-07T02:39:56Z","end":"2017-05-07T06:39:56Z","location":"Vasyl'evsky Ostrov"},
// {"begin":"2017-05-05T19:24:36Z","end":"2017-05-05T23:24:36Z","location":"Wanmingang"},
// {"begin":"2017-05-05T04:32:18Z","end":"2017-05-05T08:32:18Z","location":"Anding"},
// {"begin":"2017-05-05T09:05:03Z","end":"2017-05-05T13:05:03Z","location":"Vespasiano"},
// {"begin":"2017-05-07T13:49:13Z","end":"2017-05-07T17:49:13Z","location":"Nagrog Wetan"},
// {"begin":"2017-05-05T16:44:43Z","end":"2017-05-05T20:44:43Z","location":"Navashino"},
// {"begin":"2017-05-07T03:43:26Z","end":"2017-05-07T07:43:26Z","location":"Couto"},
// {"begin":"2017-05-05T04:07:22Z","end":"2017-05-05T08:07:22Z","location":"Xuedian"},
// {"begin":"2017-05-07T03:08:42Z","end":"2017-05-07T07:08:42Z","location":"Touzao"},
// {"begin":"2017-05-07T08:08:06Z","end":"2017-05-07T12:08:06Z","location":"Wonokromo"},
// {"begin":"2017-05-07T13:34:08Z","end":"2017-05-07T17:34:08Z","location":"Houston"},
// {"begin":"2017-05-07T17:15:46Z","end":"2017-05-07T21:15:46Z","location":"Puyung"},
// {"begin":"2017-05-07T22:33:23Z","end":"2017-05-08T02:33:23Z","location":"Perstorp"},
// {"begin":"2017-05-05T14:39:23Z","end":"2017-05-05T18:39:23Z","location":"Keren"},
// {"begin":"2017-05-06T01:33:50Z","end":"2017-05-06T05:33:50Z","location":"San Rafael"},
// {"begin":"2017-05-07T15:44:06Z","end":"2017-05-07T19:44:06Z","location":"Kempele"},
// {"begin":"2017-05-05T02:52:09Z","end":"2017-05-05T06:52:09Z","location":"Emiliano Zapata"},
// {"begin":"2017-05-05T19:52:46Z","end":"2017-05-05T23:52:46Z","location":"Eleftheroúpolis"},
// {"begin":"2017-05-07T15:38:18Z","end":"2017-05-07T19:38:18Z","location":"Qishui"},
// {"begin":"2017-05-06T12:21:01Z","end":"2017-05-06T16:21:01Z","location":"Doba"},
// {"begin":"2017-05-07T13:36:20Z","end":"2017-05-07T17:36:20Z","location":"Cam Ranh"},
// {"begin":"2017-05-05T12:27:30Z","end":"2017-05-05T16:27:30Z","location":"Xuexi"},
// {"begin":"2017-05-05T15:06:33Z","end":"2017-05-05T19:06:33Z","location":"Borehbangle"},
// {"begin":"2017-05-05T19:40:41Z","end":"2017-05-05T23:40:41Z","location":"Fankeng"},
// {"begin":"2017-05-06T08:16:21Z","end":"2017-05-06T12:16:21Z","location":"Daguo"},
// {"begin":"2017-05-06T14:31:44Z","end":"2017-05-06T18:31:44Z","location":"Rovensko pod Troskami"},
// {"begin":"2017-05-07T08:39:41Z","end":"2017-05-07T12:39:41Z","location":"Junín"},
// {"begin":"2017-05-05T10:37:48Z","end":"2017-05-05T14:37:48Z","location":"Kyurdarmir"},
// {"begin":"2017-05-07T20:17:11Z","end":"2017-05-08T00:17:11Z","location":"Smolenskoye"},
// {"begin":"2017-05-06T07:04:33Z","end":"2017-05-06T11:04:33Z","location":"Dongzhou"},
// {"begin":"2017-05-07T05:58:13Z","end":"2017-05-07T09:58:13Z","location":"San Pedro"},
// {"begin":"2017-05-06T11:46:31Z","end":"2017-05-06T15:46:31Z","location":"Jingdezhen"},
// {"begin":"2017-05-07T05:44:31Z","end":"2017-05-07T09:44:31Z","location":"Dzaoudzi"},
// {"begin":"2017-05-07T13:18:52Z","end":"2017-05-07T17:18:52Z","location":"Greystones"},
// {"begin":"2017-05-06T18:07:13Z","end":"2017-05-06T22:07:13Z","location":"Correia Pinto"},
// {"begin":"2017-05-06T14:17:29Z","end":"2017-05-06T18:17:29Z","location":"Skuratovskiy"},
// {"begin":"2017-05-07T02:26:47Z","end":"2017-05-07T06:26:47Z","location":"Staraya Kulatka"},
// {"begin":"2017-05-07T06:15:11Z","end":"2017-05-07T10:15:11Z","location":"Kāmyārān"},
// {"begin":"2017-05-06T21:21:22Z","end":"2017-05-07T01:21:22Z","location":"Voznesenskoye"},
// {"begin":"2017-05-05T12:37:49Z","end":"2017-05-05T16:37:49Z","location":"Kauswagan"},
// {"begin":"2017-05-07T06:23:00Z","end":"2017-05-07T10:23:00Z","location":"Qiagai"},
// {"begin":"2017-05-05T00:40:54Z","end":"2017-05-05T04:40:54Z","location":"Sukadana"},
// {"begin":"2017-05-06T00:17:33Z","end":"2017-05-06T04:17:33Z","location":"Haugesund"},
// {"begin":"2017-05-06T09:44:50Z","end":"2017-05-06T13:44:50Z","location":"Danglang Hudong"},
// {"begin":"2017-05-05T14:59:55Z","end":"2017-05-05T18:59:55Z","location":"Fiditi"},
// {"begin":"2017-05-05T20:08:01Z","end":"2017-05-06T00:08:01Z","location":"Stanovoye"},
// {"begin":"2017-05-06T11:02:36Z","end":"2017-05-06T15:02:36Z","location":"Karangsari"},
// {"begin":"2017-05-05T16:36:07Z","end":"2017-05-05T20:36:07Z","location":"Chrząstowice"},
// {"begin":"2017-05-06T08:45:12Z","end":"2017-05-06T12:45:12Z","location":"Dayton"},
// {"begin":"2017-05-07T00:40:09Z","end":"2017-05-07T04:40:09Z","location":"Charikar"},
// {"begin":"2017-05-06T14:37:16Z","end":"2017-05-06T18:37:16Z","location":"Betulia"},
// {"begin":"2017-05-05T04:49:15Z","end":"2017-05-05T08:49:15Z","location":"Avellaneda"},
// {"begin":"2017-05-05T20:34:04Z","end":"2017-05-06T00:34:04Z","location":"Jeżów"},
// {"begin":"2017-05-06T10:49:29Z","end":"2017-05-06T14:49:29Z","location":"Stanisław Górny"},
// {"begin":"2017-05-06T19:01:25Z","end":"2017-05-06T23:01:25Z","location":"Canhas"},
// {"begin":"2017-05-06T21:22:03Z","end":"2017-05-07T01:22:03Z","location":"Coris"},
// {"begin":"2017-05-05T12:26:04Z","end":"2017-05-05T16:26:04Z","location":"Retiro"},
// {"begin":"2017-05-06T08:35:01Z","end":"2017-05-06T12:35:01Z","location":"Alajuelita"},
// {"begin":"2017-05-06T00:14:24Z","end":"2017-05-06T04:14:24Z","location":"Garahaji"},
// {"begin":"2017-05-06T10:51:00Z","end":"2017-05-06T14:51:00Z","location":"Granville"},
// {"begin":"2017-05-05T04:58:56Z","end":"2017-05-05T08:58:56Z","location":"Shishang"},
// {"begin":"2017-05-06T06:05:04Z","end":"2017-05-06T10:05:04Z","location":"Smołdzino"},
// {"begin":"2017-05-05T06:37:42Z","end":"2017-05-05T10:37:42Z","location":"Majdal Banī Fāḑil"},
// {"begin":"2017-05-06T04:54:52Z","end":"2017-05-06T08:54:52Z","location":"Baalbek"},
// {"begin":"2017-05-06T04:40:23Z","end":"2017-05-06T08:40:23Z","location":"Zhulin"},
// {"begin":"2017-05-07T21:34:06Z","end":"2017-05-08T01:34:06Z","location":"Giesteira"},
// {"begin":"2017-05-07T04:39:40Z","end":"2017-05-07T08:39:40Z","location":"Tafí del Valle"},
// {"begin":"2017-05-06T19:34:45Z","end":"2017-05-06T23:34:45Z","location":"Luqa"},
// {"begin":"2017-05-06T20:01:20Z","end":"2017-05-07T00:01:20Z","location":"Mogotes"},
// {"begin":"2017-05-06T02:52:36Z","end":"2017-05-06T06:52:36Z","location":"Hrvatska Kostajnica"},
// {"begin":"2017-05-06T08:57:46Z","end":"2017-05-06T12:57:46Z","location":"Konotop"},
// {"begin":"2017-05-06T21:36:29Z","end":"2017-05-07T01:36:29Z","location":"Borgarnes"},
// {"begin":"2017-05-07T12:39:00Z","end":"2017-05-07T16:39:00Z","location":"Duy Xuyên"},
// {"begin":"2017-05-05T04:27:28Z","end":"2017-05-05T08:27:28Z","location":"Saue"},
// {"begin":"2017-05-07T14:29:44Z","end":"2017-05-07T18:29:44Z","location":"Sophia Antipolis"},
// {"begin":"2017-05-05T23:15:06Z","end":"2017-05-06T03:15:06Z","location":"Tokoname"},
// {"begin":"2017-05-06T08:32:31Z","end":"2017-05-06T12:32:31Z","location":"Khong"},
// {"begin":"2017-05-06T01:11:28Z","end":"2017-05-06T05:11:28Z","location":"Lingmen"},
// {"begin":"2017-05-05T04:47:01Z","end":"2017-05-05T08:47:01Z","location":"Diang"},
// {"begin":"2017-05-06T09:08:49Z","end":"2017-05-06T13:08:49Z","location":"Guandukou"},
// {"begin":"2017-05-06T17:56:24Z","end":"2017-05-06T21:56:24Z","location":"Saint-Quentin-en-Yvelines"},
// {"begin":"2017-05-05T23:22:29Z","end":"2017-05-06T03:22:29Z","location":"Hulu"},
// {"begin":"2017-05-05T12:07:30Z","end":"2017-05-05T16:07:30Z","location":"Nizhniy Tsasuchey"},
// {"begin":"2017-05-05T02:42:00Z","end":"2017-05-05T06:42:00Z","location":"Nekrasovka"},
// {"begin":"2017-05-06T10:33:22Z","end":"2017-05-06T14:33:22Z","location":"Jembe Timur"},
// {"begin":"2017-05-07T06:53:48Z","end":"2017-05-07T10:53:48Z","location":"Carpalho"},
// {"begin":"2017-05-05T03:55:49Z","end":"2017-05-05T07:55:49Z","location":"Gushikawa"},
// {"begin":"2017-05-06T17:32:25Z","end":"2017-05-06T21:32:25Z","location":"Poretskoye"},
// {"begin":"2017-05-07T08:53:22Z","end":"2017-05-07T12:53:22Z","location":"Eséka"},
// {"begin":"2017-05-05T23:18:50Z","end":"2017-05-06T03:18:50Z","location":"Huoli"},
// {"begin":"2017-05-05T00:20:17Z","end":"2017-05-05T04:20:17Z","location":"Duodaoshi"},
// {"begin":"2017-05-05T04:07:29Z","end":"2017-05-05T08:07:29Z","location":"Merik"},
// {"begin":"2017-05-07T23:30:00Z","end":"2017-05-08T03:30:00Z","location":"Cairima"},
// {"begin":"2017-05-05T17:47:34Z","end":"2017-05-05T21:47:34Z","location":"Staronizhestebliyevskaya"},
// {"begin":"2017-05-05T14:47:10Z","end":"2017-05-05T18:47:10Z","location":"Bombardopolis"},
// {"begin":"2017-05-05T12:13:20Z","end":"2017-05-05T16:13:20Z","location":"Jiaocun"},
// {"begin":"2017-05-07T02:12:20Z","end":"2017-05-07T06:12:20Z","location":"Novonukutskiy"},
// {"begin":"2017-05-06T11:55:09Z","end":"2017-05-06T15:55:09Z","location":"Rybnoye"},
// {"begin":"2017-05-07T20:31:50Z","end":"2017-05-08T00:31:50Z","location":"Dahe"},
// {"begin":"2017-05-05T11:10:04Z","end":"2017-05-05T15:10:04Z","location":"Sanhe"},
// {"begin":"2017-05-05T22:52:54Z","end":"2017-05-06T02:52:54Z","location":"Taouloukoult"},
// {"begin":"2017-05-07T10:42:20Z","end":"2017-05-07T14:42:20Z","location":"Angers"},
// {"begin":"2017-05-06T21:43:11Z","end":"2017-05-07T01:43:11Z","location":"Strasbourg"},
// {"begin":"2017-05-07T06:53:02Z","end":"2017-05-07T10:53:02Z","location":"Drawno"},
// {"begin":"2017-05-07T16:38:48Z","end":"2017-05-07T20:38:48Z","location":"Dongwan"},
// {"begin":"2017-05-06T01:32:34Z","end":"2017-05-06T05:32:34Z","location":"Enskede"},
// {"begin":"2017-05-06T23:06:24Z","end":"2017-05-07T03:06:24Z","location":"Farranacoush"},
// {"begin":"2017-05-05T17:17:56Z","end":"2017-05-05T21:17:56Z","location":"Huangjinjing"},
// {"begin":"2017-05-05T16:37:33Z","end":"2017-05-05T20:37:33Z","location":"Měcholupy"},
// {"begin":"2017-05-07T03:04:19Z","end":"2017-05-07T07:04:19Z","location":"Sernovodsk"},
// {"begin":"2017-05-07T11:54:15Z","end":"2017-05-07T15:54:15Z","location":"Qiakeri"},
// {"begin":"2017-05-07T18:10:41Z","end":"2017-05-07T22:10:41Z","location":"Dipayal"},
// {"begin":"2017-05-05T22:05:46Z","end":"2017-05-06T02:05:46Z","location":"Karanggeneng"},
// {"begin":"2017-05-05T06:00:53Z","end":"2017-05-05T10:00:53Z","location":"Sandaohezi"},
// {"begin":"2017-05-05T10:21:05Z","end":"2017-05-05T14:21:05Z","location":"Hartford"},
// {"begin":"2017-05-07T08:24:26Z","end":"2017-05-07T12:24:26Z","location":"Kapotnya"},
// {"begin":"2017-05-07T03:56:37Z","end":"2017-05-07T07:56:37Z","location":"Ngromo"},
// {"begin":"2017-05-06T12:25:31Z","end":"2017-05-06T16:25:31Z","location":"Port-Vila"},
// {"begin":"2017-05-07T12:51:40Z","end":"2017-05-07T16:51:40Z","location":"Velykyy Klyuchiv"},
// {"begin":"2017-05-07T07:57:43Z","end":"2017-05-07T11:57:43Z","location":"Pende"},
// {"begin":"2017-05-07T07:09:22Z","end":"2017-05-07T11:09:22Z","location":"Chaumont"},
// {"begin":"2017-05-07T13:04:44Z","end":"2017-05-07T17:04:44Z","location":"Livramento"},
// {"begin":"2017-05-05T07:34:35Z","end":"2017-05-05T11:34:35Z","location":"Qianguo"},
// {"begin":"2017-05-07T15:03:35Z","end":"2017-05-07T19:03:35Z","location":"Ribeira do Pombal"},
// {"begin":"2017-05-07T16:12:15Z","end":"2017-05-07T20:12:15Z","location":"Lebedinovka"},
// {"begin":"2017-05-07T04:30:14Z","end":"2017-05-07T08:30:14Z","location":"Weekombaka"},
// {"begin":"2017-05-07T22:44:46Z","end":"2017-05-08T02:44:46Z","location":"Rotunda"}
  ]
}
module.exports = availabilityData;
