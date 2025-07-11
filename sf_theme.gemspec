# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name          = 'sf_theme'
  s.version       = '0.0.1'
  s.license       = ''
  s.authors       = ['Samuel Farrens']
  s.email         = ['']
  s.homepage      = ''
  s.summary       = ''

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  s.platform = Gem::Platform::RUBY
  s.required_ruby_version = '>= 2.7.0'
  
  s.add_runtime_dependency 'jekyll', '>= 3.9'
  # s.add_runtime_dependency 'jekyll-latex', '>= 1.2.0'  # Temporarily disabled due to Ruby 3.4.0 compatibility issues
  s.add_runtime_dependency 'jekyll-target-blank', '>= 2.0'
  s.add_runtime_dependency 'kramdown', '>= 1.17'
  s.add_development_dependency 'html-proofer', '>= 5.0'
end
