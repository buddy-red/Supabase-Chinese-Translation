import { observer } from 'mobx-react-lite'
import { useStore, useFlag } from 'hooks'
import { PROVIDERS_SCHEMAS, PROVIDER_SAML } from 'stores/authConfig/schema'
import { FormHeader } from 'components/ui/Forms'
import { HorizontalShimmerWithIcon } from 'components/ui/Shimmers'
import ProviderForm from './ProviderForm'
import { ProviderCollapsibleClasses } from './AuthProvidersForm.constants'

const AuthProvidersForm = () => {
  const { authConfig } = useStore()
  const isSamlEnabled = useFlag('isSamlEnabled')
  const providers = isSamlEnabled
    ? PROVIDERS_SCHEMAS
    : PROVIDERS_SCHEMAS.filter((provider) => provider !== PROVIDER_SAML)

  return (
    <div>
      <FormHeader
        title="Auth Providers"
        description="Authenticate your users through a suite of providers and login methods"
      />

      <div className="-space-y-px">
        {!authConfig.isLoaded
          ? providers.map((provider) => (
              <div
                key={`provider_${provider.title}`}
                className={[...ProviderCollapsibleClasses, 'px-6 py-3'].join(' ')}
              >
                <HorizontalShimmerWithIcon />
              </div>
            ))
          : providers.map((provider) => {
              // @ts-expect-error: Fix type to be dynamic
              return <ProviderForm key={`provider_${provider.title}`} provider={provider} />
            })}
      </div>
    </div>
  )
}

export default observer(AuthProvidersForm)
