
names = ("第一次冒险：抵达德拉斯堡",
"第二次冒险：金锚",
"第三次冒险：第一份合同",
"第五次冒险：金锚的比赛",
"第六次冒险：森林深处的废墟",
"林中强盗",
"前往米勒巴赫的旅程",
"喧嚷的酒吧",
"第一份工作",
"港口的仓库",
"乡间漫步",
"酒吧底下的地精洞穴",
"小题大做",
"藏宝图",
"药材铺",
"乌鸦之田",
"爬虫的侵袭",
"盗贼公会",
"静水深流",
"莫里斯王墓",
"阴森的树林",
"''远古恶魔''",
"危急的祖舒亚",
"克伦切的兽人洞",
"兵工厂内的幽灵",
"泽瑞希尔的战斗学院",
"戒指",
"先人的骸骨",
"渡鸦堡的集市",
"狩猎狼群",
"法师与怪物",
"竖琴",
"献祭",
"山脉中的古老高塔",
"德雷索尼亚的阴影",
"觉醒",
"巨魔难题",
"沼泽幼龙的狩猎之旅",
"塔博塔博的亡灵巫师",
"艰辛的面试或是第十三个勇士",
"盗墓贼",
"瑞俄伯的女巫",
"黑石头",
"在无人山谷中的制造厂",
"跳舞木偶夜总会",
"受诅咒的遗迹",
"老旧矿井",
"伍登格罗谜案",
"通往故乡的漫长旅程",
"捉迷藏",
"齐鲁玛邪教的秘密",
"马戏团失踪的孩子",
"诅咒农场的调查",
"阿克贝斯之泪",
"复仇之夜",
"霰弹枪工厂的阴谋",
"庄园",
"山中的假日",
"英雄的坟墓",
"圣诞节的白雾林",
"泰伦索尔的奇异物品商店",
"米勒巴赫的袭击",
"矮人阶梯",
"琥珀的秘密",
"神秘信息",
"竞技比赛的前夜",
"驱逐米勒巴赫的兽人",
"彩虹尽头",
"亡灵巫师塔博塔博的回归",
"摩-莫拉齐",
"保护商路",
"紫色禁地",
"第一道门",
"发狂的炼金术士",
"寒冰女王",
"银刺",
"父债子还",
"第二道门",
"沼泽中的巨石阵",
"护送",
"阴影之心",
"小，却高！",
"劳累一天后的夜晚",
"绿野仙踪",
"遗失的书籍",
"图书馆的一夜",
"危险的知识",
"神圣礼堂",
"时间，星光和佛罗特旺的猎人",
"峡谷侦察",
"血腥之手",
"结局",
"尤里佛的一天",
"扎卜耶纳的先知！",
"笼罩提琳的阴云",
"黄金群岛之谜")

fp = open('items.txt', 'r+')

dungeon_name = ''
floor = ''

for line in fp.readlines():
    line = line.replace('•', '').strip().replace(' ', '')
    if line == '':
        continue
    if line in names:
        dungeon_name = line
        continue
    if line.startswith('F') or line.startswith('第'):
        floor = line
        continue
    item_name, *args = line.split('|')
    if len(args)>0:
        note = args[0]
    else:
        note = ''
    
    print(f'{item_name}, {dungeon_name}, {floor}, {note}')
