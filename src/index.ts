import { post } from './utils'

async function main () {

  var temp_div:HTMLDivElement = document.createElement('div');
  temp_div.innerHTML = "";

  function ReadPage(temp_div:HTMLDivElement) {
    var form_data = $(temp_div).find('form').serialize();
    // 提取时间
    var datetime_string = $(temp_div).find('h2').eq(0).text();
    var datetime = datetime_string.split(' - ')[0];
    var map_name = datetime_string.split(' - ')[1];
    // 提取掉落明细
    var index = 0;
    var content_table = $(temp_div).find('.content_table')
    var drops = [];
    while(index < 12) {
      var charname = content_table.find('h2').eq(index).text();
      if(charname == '') {
          break;
      }
      var sub_table = content_table.children('tbody').children('tr').children('td').children('table').eq(index);

      var desc = sub_table.children('tbody').children('tr').children('td').eq(2).find('p');

      if (desc.text().indexOf('被打昏了，为了将其安全的带回来，只好把其得到的战利品抛弃了') > 0) {
          index += 1;
          continue;
      }

      var items = sub_table.children('tbody').children('tr').children('td').eq(2).find('a');
      for (var it of items) {
          drops.push({'item_name': it.innerHTML, 'charname': charname});
      }
      index += 1;
    }
    // 组织数据
    var payload = {
      "form_data": form_data,
      "datetime": datetime,
      "map_name": map_name,
      "drops": drops,
    };
    return payload;
  }


  function GetPage(report_id:string, wod_post_id:string) {
    var XmlHttp = new XMLHttpRequest();
    XmlHttp.onreadystatechange = function() {
        try {
            if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
                temp_div.innerHTML = XmlHttp.responseText;
                //Stat.nReadPages = nRepPage;
                //Stat.iscurrentPage = false;
                var payload = ReadPage(temp_div);
                const res =  post<{ uuid: string }>('http://www.wodgroup.top/upload', payload);
            }
        } catch (e) {
            alert("XMLHttpRequest.onreadystatechange(): " + e);
        }
    };

    var URL = location.protocol + "//" + location.host + "/wod/spiel/dungeon/report.php";
    //Stat.ShowProgress();
    var param = "wod_post_id="+ wod_post_id + "&report_id[0]="+ report_id+"&items[0]=获得物品"

    XmlHttp.open("POST", URL, true);
    XmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XmlHttp.send(param);
  }

  function exportAllDrops() {
      // report_id
     var wod_post_id = $("input[name=wod_post_id]").val() as string;
     $(".content_table input[type=hidden]").each(function() {
       var report_id = $(this).val() as string;
       GetPage(report_id, wod_post_id);
     });
     //addProcess(num);
  }

  // 如果是在战报页面，添加按钮
  var form_data = $('form').serialize();
  if (window.location.pathname == '/wod/spiel/dungeon/report.php' || $('h1').text() == '战报') {
      var c_table = $('.content_table');
      const urlParams = new URLSearchParams(form_data);
      var group_id = urlParams.get('gruppe_id');
      c_table.before('<input type="button" style="float:right" value="统" id="drops_statistics" class="button clickable">')
      c_table.before('<input type="button" style="float:right" value="特产表" id="goto_drops_table" class="button clickable">')
      $('#drops_statistics').on('click', exportAllDrops);
      $('#goto_drops_table').on('click', function () {
        window.open("http://www.wodgroup.top/" + group_id + "/drops", '_blank');
      });
      return
  }

  // 判断是否在掉落页面
  if ($('h1').text().split(':')[0] == '物品纵览') {
        // 上传
        var payload = ReadPage(document.getElementById('page-border') as HTMLDivElement);
        const res = await post<{ uuid: string }>('http://www.wodgroup.top/upload', payload);

  }
}

main().catch(e => {
  console.log(e)
})
