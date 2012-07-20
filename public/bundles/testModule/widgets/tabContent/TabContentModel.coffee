define [
  'cordModel'
], (Model) ->

  class TabContentModel extends Model
    @configure "TabContentModel", "firstname", "lastname"

    @extend Model.Ajax
    @url: "/contents"

    fullName: -> [@firstname, @lastname].join(' ')

  TabContentModel