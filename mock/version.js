import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    create_date:'@datetime',
    'env|1':[{'code':'1','name':'SIT'},{'code':'2','name':'UAT'}],
    'channel|1':[{'code':'1','name':'全渠道'},{'code':'2','name':'个险渠道'},{'code':'3','name':'银保渠道'}],
    'version_type|1':[{'code':'1','name':'安卓'},{'code':'2','name':'公共文件'}],
    version_name:'@name',
    version_num:'@integer(10, 50)',
    version_desc:'@sentence',
    down_url:'https://github.com/OSpoon/PY-DOC/blob/master/README.md'
  }]
})

export default [
  {
    url: '/version/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
