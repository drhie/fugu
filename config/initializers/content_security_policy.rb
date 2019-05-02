Rails.application.config.content_security_policy do |p|
  # @see: https://github.com/rails/rails/issues/31298#issuecomment-348513130
  if Rails.env.development?
    p.connect_src :self, :https, 'ws://localhost:3035', 'http://localhost:3035'
    p.script_src :self, :https, :unsafe_eval, :unsafe_inline
  else
    p.script_src  :self, :https, :unsafe_eval, :unsafe_inline
  end
end
