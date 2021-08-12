import { post } from './utils'

async function main () {
  // 如果实在战报页面，添加按钮
  var form_data = $('form').serialize();
  if (window.location.pathname == '/wod/spiel/dungeon/report.php') {
      var the_th = $('.content_table .header th').eq(2);
      const urlParams = new URLSearchParams(form_data);
      var group_id = urlParams.get('gruppe_id');
      the_th.html('<a href="http://www.wodgroup.top/' + group_id + '/drops" target="_blank" class="menu">特产统计</a>');
      return
  }

  // 判断是否在掉落页面
  if ($('h1').text().split(':')[0] != '物品纵览') {
        return
  }
  // 提取时间
  var datetime_string = $('h2').eq(0).text();
  var datetime = datetime_string.split(' - ')[0];
  var map_name = datetime_string.split(' - ')[1];
  // 提取掉落明细
  var index = 0;
  var content_table = $('.content_table')
  var drops = [];
  while(index < 12) {
    var charname = content_table.find('h2').eq(index).text();
    if(charname == '') {
        break;
    }
    var sub_table = content_table.children('tbody').children('tr').children('td').children('table').eq(index);
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
  
  // 上传
  const res = await post<{ uuid: string }>('http://www.wodgroup.top/upload', payload)

}

main().catch(e => {
  console.log(e)
})
