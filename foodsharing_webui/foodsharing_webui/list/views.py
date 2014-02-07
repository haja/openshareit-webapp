from django.http import HttpResponse
from django.template import RequestContext, loader

from foodsharing_webui.list.mappings import Basket

def index(request):
    #TODO do RESTcall here

    baskets = [Basket('title1', 'descr1'), Basket('title2', 'descr2')]

    template = loader.get_template('foodsharing_webui/list/index.html')
    context = RequestContext(request, {
        'baskets': baskets,
        })
    return HttpResponse(template.render(context))
